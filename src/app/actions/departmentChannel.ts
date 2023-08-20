'use server'

import { firebaseAdminAuth, firebaseAdminFirestore } from '@/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export const createDepartmentChannel = async (
  formdata: FormData,
  token: string
) => {
  const title = formdata.get('title') as string
  const description = formdata.get('description') as string
  const department = formdata.get('department') as string
  const channelType = formdata.get('type') as string

  const decodedToken = await firebaseAdminAuth.verifyIdToken(token)
  const user = await firebaseAdminAuth.getUser(decodedToken.uid)

  const departmentMembership = await firebaseAdminFirestore
    .collection('departmentMembers')
    .where('userId', '==', decodedToken.uid)
    .where('departmentId', '==', department)
    .get()

  if (!departmentMembership.docs[0]?.exists) {
    throw new Error('Department does not exist')
  }

  const channelDoc = await firebaseAdminFirestore
    .collection('departmentChannels')
    .add({
      title,
      description,
      departmentId: department,
      type: channelType,
      createdBy: decodedToken.uid,
      createdAt: FieldValue.serverTimestamp(),
    })

  await firebaseAdminFirestore.collection('departmentChannelMembers').add({
    channelType,
    departmentId: department,

    userId: decodedToken.uid,
    userRole: departmentMembership.docs[0].data()?.userRole,
    userDisplayName: user.displayName,

    channelTitle: title,
    channelId: channelDoc.id,
    createdAt: FieldValue.serverTimestamp(),
  })

  return {
    message: 'Channel created successfully',
  }
}

export const addMessageToChannel = async (
  body: {
    content: string
    departmentId: string
    channelId: string
  },
  token: string
) => {
  const decodedToken = await firebaseAdminAuth.verifyIdToken(token)
  const { uid } = decodedToken

  const user = await firebaseAdminAuth.getUser(uid)

  const channelMembershipDoc = await firebaseAdminFirestore
    .collection('departmentChannelMembers')
    .where('userId', '==', uid)
    .get()

  await firebaseAdminFirestore
    .doc(`departmentChannels/${body.channelId}`)
    .collection('messages')
    .add({
      content: body.content,
      userDisplayName: user.displayName,
      userRole: channelMembershipDoc.docs[0].data()?.userRole,
      createdBy: uid,
      createdAt: FieldValue.serverTimestamp(),
    })

  return {
    message: 'Message added successfully',
  }
}
