'use server'

import { firebaseAdminFirestore } from '@/firebase/admin'
import { Invitation, UserAccountCreationPayload } from '@/typings'
import { encyptedJWTPayload } from '@/utils/jwt'

export async function generateAccountCreationToken(body: FormData) {
  const payload: UserAccountCreationPayload = {
    email: body.get('email') as string,
    fullname: body.get('fullname') as string,
    password: body.get('password') as string,
    invitationId: body.get('invitationId') as string,
  }

  const { invitationId } = payload
  const invitationDoc = await firebaseAdminFirestore
    .doc(`invitations/${invitationId}`)
    .get()
  const invitationData = invitationDoc.data() as Invitation

  if (!invitationDoc.exists) {
    throw new Error('Invalid invitation')
  }

  if (invitationData.email !== payload.email) {
    throw new Error('Can only sign up using invitation email')
  }

  const token = await encyptedJWTPayload({ ...payload })
  return { token }
}
