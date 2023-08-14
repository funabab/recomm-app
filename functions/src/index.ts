import { beforeUserCreated } from 'firebase-functions/v2/identity'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { Invitation } from '../../src/typings'
import * as dayjs from 'dayjs'

initializeApp()

export const onAccountCreated = beforeUserCreated(
  { maxInstances: 10 },
  async (user) => {
    const firestore = getFirestore()
    const invitations = await firestore
      .collection('invitations')
      .where('email', '==', user.data.email)
      .get()

    const activeInvitation = invitations.docs.find((invitation) =>
      dayjs((invitation.data() as Invitation).expiresAt.toDate()).isAfter(
        dayjs()
      )
    )

    if (!activeInvitation) {
      throw new Error("Can't create account without an invitation")
    }
  }
)

export const acceptDepartmentInvitation = onCall(
  { maxInstances: 10 },
  async (request) => {
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

    const acriveInvitationData = activeInvitationDoc.data() as Invitation

    await firestore.runTransaction(async (trx) => {
      trx.create(
        firestore
          .doc(`departments/${acriveInvitationData.department}`)
          .collection('members')
          .doc(uid),
        {
          displayName: requestData.displayName,
          department: acriveInvitationData.department,
          role: acriveInvitationData.role,
          createdAt: new Date(),
        }
      )

      trx.update(
        firestore.doc(`departments/${acriveInvitationData.department}`),
        {
          membersCount: FieldValue.increment(1),
        }
      )

      trx.delete(activeInvitationDoc.ref)
    })

    return {
      message: 'Invitation accepted successfully',
    }
  }
)
