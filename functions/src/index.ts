import { beforeUserCreated } from 'firebase-functions/v2/identity'
import * as functions from 'firebase-functions'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { DepartmentMembership, Invitation } from '../../src/typings'
import * as dayjs from 'dayjs'
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { getAuth } from 'firebase-admin/auth'

initializeApp()
setGlobalOptions({ maxInstances: 10 })

export const onBeforeAccountCreated = beforeUserCreated(async (user) => {
  const firestore = getFirestore()
  const invitations = await firestore
    .collection('invitations')
    .where('email', '==', user.data.email)
    .get()

  const activeInvitation = invitations.docs.find((invitation) =>
    dayjs((invitation.data() as Invitation).expiresAt.toDate()).isAfter(dayjs())
  )

  if (!activeInvitation) {
    throw new Error("Can't create account without an invitation")
  }
})

export const onAccountCreated = functions.auth.user().onCreate((user) => {
  const firestore = getFirestore()
  const data = JSON.parse(JSON.stringify(user))

  delete data.displayName
  delete data.photoURL

  return firestore.doc(`users/${user.uid}`).set(data, { merge: true })
})

export const onDepartmentMembersCollectionUpdated = onDocumentWritten(
  'departmentMembers/{membershipId}',
  async (event) => {
    const firestore = getFirestore()
    const userId = (event.data?.after.data()?.userId ||
      event.data?.before.data()?.userId) as string

    if (event.data?.before === undefined || event.data.after === undefined) {
      const departmentId = (event.data?.before.data()?.departmentId ||
        event.data?.after.data()?.departmentId) as string

      await firestore.doc(`departments/${departmentId}`).update({
        membersCount: event.data?.after
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

    if (!event.data?.before === undefined || event.data?.after === undefined) {
      const channeld = (event.data?.before.data()?.channeld ||
        event.data?.after.data()?.channeld) as string

      await firestore.doc(`departmentChannels/${channeld}`).update({
        membersCount: event.data?.after
          ? FieldValue.increment(1)
          : FieldValue.increment(-1),
      })
    }
  }
)

export const onUsersCollectionUpdated = onDocumentWritten(
  'users/{userId}',
  async (event) => {
    const auth = getAuth()

    if (
      event.data?.before &&
      event.data.after &&
      event.data.before.data()?.displayName ===
        event.data.after.data()?.displayName &&
      event.data.before.data()?.photoURL === event.data.after.data()?.photoURL
    ) {
      await auth.updateUser(event.params.userId, {
        displayName: event.data?.after.data()?.displayName,
        photoURL: event.data?.after.data()?.photoURL,
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
