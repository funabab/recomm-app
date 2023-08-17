import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { DepartmentMembership, Invitation } from '../../src/typings'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import dayjs = require('dayjs')

export const onDepartmentMembersCollectionUpdated = onDocumentWritten(
  'departmentMembers/{membershipId}',
  async (event) => {
    const firestore = getFirestore()
    const userId = (event.data?.after.data()?.userId ||
      event.data?.before.data()?.userId) as string

    console.log(
      'calling onDepartmentMembersCollectionUpdated function with event',
      event
    )

    if (!event.data?.before.exists || !event.data.after.exists) {
      const departmentId = (event.data?.before.data()?.departmentId ||
        event.data?.after.data()?.departmentId) as string

      await firestore.doc(`departments/${departmentId}`).update({
        membersCount: event.data?.after.exists
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }

    const memberships = await firestore
      .collection('departmentMembers')
      .where('userId', '==', userId)
      .get()

    await firestore.doc(`users/${userId}`).set(
      {
        memberships: memberships.docs.map((membership) => {
          const membershipData = membership.data() as DepartmentMembership
          return {
            departmentTitle: membershipData.departmentTitle,
            departmentId: membershipData.departmentId,
            role: membershipData.userRole,
          }
        }),
      },
      {
        merge: true,
      }
    )
  }
)

export const onDepartmentChannelMembersCollectionUpdated = onDocumentWritten(
  'departmentChannelMembers/{membershipId}',
  async (event) => {
    const firestore = getFirestore()

    if (!event.data?.before.exists || !event.data?.after.exists) {
      const channelId = (event.data?.before.data()?.channelId ||
        event.data?.after.data()?.channelId) as string

      await firestore.doc(`departmentChannels/${channelId}`).update({
        membersCount: event.data?.after.exists
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }
  }
)

export const acceptDepartmentInvitation = onCall(async (request) => {
  const uid = request.auth?.uid
  const requestData = request.data as
    | { id: string; email: string; displayName: string }
    | undefined

  if (!uid) {
    throw new HttpsError('unauthenticated', 'You must be logged in')
  }

  if (!requestData) {
    throw new HttpsError('invalid-argument', 'Invalid invitation id')
  }

  const firestore = getFirestore()
  const invitations = await firestore
    .collection(`invitations`)
    .where('email', '==', requestData.email)
    .get()

  const activeInvitationDoc = invitations.docs.find((invitationDoc) => {
    const invitationData = invitationDoc.data() as Invitation
    return (
      invitationDoc.id === requestData.id &&
      dayjs(invitationData.expiresAt.toDate()).isAfter(dayjs())
    )
  })

  if (!activeInvitationDoc) {
    throw new HttpsError('not-found', 'Invitation not found')
  }

  const activeInvitationData = activeInvitationDoc.data() as Invitation

  await firestore.runTransaction(async (trx) => {
    const department = await trx.get(
      firestore.doc(`departments/${activeInvitationData.department}`)
    )

    trx.create(firestore.collection('departmentMembers').doc(), {
      userDisplayName: requestData.displayName,
      userId: uid,
      userRole: activeInvitationData.role,
      userEmail: activeInvitationData.email,

      departmentTitle: department.data()?.title,
      departmentId: department.id,
      createdAt: new Date(),
    })

    trx.delete(activeInvitationDoc.ref)
  })

  return {
    message: 'Invitation accepted successfully',
  }
})
