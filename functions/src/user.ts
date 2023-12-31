import dayjs = require('dayjs')
import { getFirestore } from 'firebase-admin/firestore'
import {
  HttpsError,
  beforeUserCreated,
  beforeUserSignedIn,
} from 'firebase-functions/v2/identity'
import { Invitation } from '../../src/typings'
import { auth } from 'firebase-functions/v1'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { getAuth } from 'firebase-admin/auth'

export const onBeforeAccountCreated = beforeUserCreated(async (event) => {
  const firestore = getFirestore()
  const invitations = await firestore
    .collection('invitations')
    .where('email', '==', event.data.email)
    .get()

  const activeInvitation = invitations.docs.find((invitation) =>
    dayjs((invitation.data() as Invitation).expiresAt.toDate()).isAfter(dayjs())
  )

  if (
    event.additionalUserInfo?.providerId !== 'google.com' &&
    !activeInvitation
  ) {
    throw new HttpsError(
      'aborted',
      "Can't create account without an invitation"
    )
  }
})

export const onBeforeAccountSignIn = beforeUserSignedIn(async (user) => {
  if (user.credential?.providerId === 'google.com') {
    const firestore = getFirestore()

    const backofficeSysDoc = await firestore.doc(`system/backoffice`).get()
    const allowedGmails: string[] | undefined =
      backofficeSysDoc.data()?.allowedGmails

    if (!allowedGmails?.includes(user.data.email!)) {
      throw new HttpsError('aborted', 'Not authorized to login to backoffice')
    }
  }
})

export const onAccountCreated = auth.user().onCreate((user) => {
  const firestore = getFirestore()
  const data = JSON.parse(JSON.stringify(user))

  delete data.displayName
  delete data.photoURL

  return firestore.doc(`users/${user.uid}`).set(data, { merge: true })
})

export const onUsersCollectionUpdated = onDocumentWritten(
  'users/{userId}',
  async (event) => {
    const firebaseAuth = getAuth()

    if (
      event.data?.before &&
      event.data.after &&
      event.data.before.data()?.displayName ===
        event.data.after.data()?.displayName &&
      event.data.before.data()?.photoURL === event.data.after.data()?.photoURL
    ) {
      await firebaseAuth.updateUser(event.params.userId, {
        displayName: event.data?.after.data()?.displayName,
        photoURL: event.data?.after.data()?.photoURL,
      })
    }
  }
)
