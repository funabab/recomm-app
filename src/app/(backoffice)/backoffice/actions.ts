'use server'

import { firebaseAdminFirestore } from '@/firebase/admin'
import { USER_ROLES } from '@/utils/constants'
import { resend, resendSender } from '@/utils/email'
import { FieldValue } from 'firebase-admin/firestore'

export const createDepartment = async (formdata: FormData) => {
  const title = formdata.get('title') as string
  const description = formdata.get('description') as string

  await firebaseAdminFirestore.collection('departments').add({
    title,
    description,
    createdAt: FieldValue.serverTimestamp(),
  })

  return {
    message: 'Department created successfully',
  }
}

export const inviteUserToDepartment = async (formdata: FormData) => {
  const fullName = formdata.get('fullname') as string
  const email = formdata.get('email') as string
  const department = formdata.get('department') as string
  const role = formdata.get('role') as string

  const invitationDoc = await firebaseAdminFirestore
    .collection('invitations')
    .add({
      fullName,
      email,
      department,
      role,
      createdAt: FieldValue.serverTimestamp(),
    })

  await resend.emails.send({
    from: resendSender,
    to: [email],
    subject: `Invitation to join ${department} department`,
    text: `Hi ${fullName}, you have been invited to join ${department} department as ${[
      USER_ROLES[role],
    ]}. \n\n Click this link to accept the invitation: ${
      process.env.NEXT_PUBLIC_BASE_URL
    }/invitation/${
      invitationDoc.id
    } \n\n If you have any questions, please contact Technical Administrator. \n\n Thanks, \n ${department} department`,
  })

  return {
    message: 'User Invitation sent successfully to ' + email,
  }
}
