'use server'

import { firebaseAdminAuth, firebaseAdminFirestore } from '@/firebase/admin'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { resend, resendSender } from '@/utils/email'
import dayjs from 'dayjs'
import { USER_ROLES } from '@/utils/constants'
import { Department, Invitation, UserRole } from '@/typings'

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

export const editDepartment = async (formdata: FormData) => {
  const title = formdata.get('title') as string
  const description = formdata.get('description') as string
  const departmentId = formdata.get('departmentId') as string

  await firebaseAdminFirestore.doc(`departments/${departmentId}`).update({
    title,
    description,
  })

  return {
    message: 'Department updated successfully',
  }
}

export const deleteDepartment = async (departmentId: string) => {
  await firebaseAdminFirestore.doc(`departments/${departmentId}`).delete()
  return {
    message: 'Department updated successfully',
  }
}

export const inviteUserToDepartment = async (formdata: FormData) => {
  const fullName = formdata.get('fullname') as string
  const email = formdata.get('email') as string
  const department = formdata.get('department') as string
  const role = formdata.get('role') as string
  const expiryDate = dayjs().add(15, 'minute')

  const existingMembership = await firebaseAdminFirestore
    .collection('departmentMembers')
    .where('userEmail', '==', email)
    .where('departmentId', '==', department)
    .get()

  if (!existingMembership.empty) {
    throw new Error('User is already a member of this department')
  }

  const departmentDoc = await firebaseAdminFirestore
    .doc(`departments/${department}`)
    .get()

  if (!departmentDoc.exists) {
    throw new Error('Department does not exist')
  }

  const departmentData = departmentDoc.data() as Department
  const invitationDoc = await firebaseAdminFirestore
    .collection('invitations')
    .add({
      fullName,
      email,
      department,
      role,
      expiresAt: Timestamp.fromDate(expiryDate.toDate()),
      createdAt: FieldValue.serverTimestamp(),
    })

  await resend.emails.send({
    from: resendSender,
    to: [email],
    subject: `Invitation to join ${departmentData.title} department`,
    text: `Hi ${fullName}, you have been invited to join ${
      departmentData.title
    } department as ${[
      USER_ROLES[role as UserRole],
    ]}. \n\n Click this link to accept the invitation: ${
      process.env.NEXT_PUBLIC_BASE_URL
    }/invitation/${
      invitationDoc.id
    } \n\n If you have any questions, please contact Technical Administrator. \n\n Thanks, \n ${
      departmentData.title
    } department`,
  })

  return {
    message: 'User Invitation sent successfully to ' + email,
  }
}

export const inviteMemberToDepartment = async (formdata: FormData) => {
  const fullName = formdata.get('fullname') as string
  const email = formdata.get('email') as string
  const department = formdata.get('department') as string

  const role: UserRole = 'staff'
  const expiryDate = dayjs().add(15, 'minute')

  const existingMembership = await firebaseAdminFirestore
    .collection('departmentMembers')
    .where('userEmail', '==', email)
    .where('departmentId', '==', department)
    .get()

  if (!existingMembership.empty) {
    throw new Error('User is already a member of this department')
  }

  const departmentDoc = await firebaseAdminFirestore
    .doc(`departments/${department}`)
    .get()

  if (!departmentDoc.exists) {
    throw new Error('Department does not exist')
  }

  const departmentData = departmentDoc.data() as Department
  const invitationDoc = await firebaseAdminFirestore
    .collection('invitations')
    .add({
      fullName,
      email,
      department,
      role,
      expiresAt: Timestamp.fromDate(expiryDate.toDate()),
      createdAt: FieldValue.serverTimestamp(),
    })

  await resend.emails.send({
    from: resendSender,
    to: [email],
    subject: `Membership Invitation to join ${departmentData.title} department`,
    text: `Hi ${fullName}, you have been invited to join ${
      departmentData.title
    } department as ${[
      USER_ROLES[role as UserRole],
    ]}. \n\n Click this link to accept the invitation: ${
      process.env.NEXT_PUBLIC_BASE_URL
    }/invitation/${
      invitationDoc.id
    } \n\n If you have any questions, please contact Technical Administrator. \n\n Thanks, \n ${
      departmentData.title
    } department`,
  })

  return {
    message: 'Member Invitation sent successfully to ' + email,
  }
}

export const deleteUserInvitation = async (invitationId: string) => {
  await firebaseAdminFirestore.doc(`invitations/${invitationId}`).delete()
  return {
    message: 'Invitation deleted successfully',
  }
}

export const acceptDepartmentInvitation = async (
  body: { id: string; email: string | null; displayName: string | null },
  tokenId: string
) => {
  const decodedToken = await firebaseAdminAuth.verifyIdToken(tokenId)
  const uid = decodedToken.uid

  if (!uid) {
    throw new Error('You must be logged in')
  }

  if (!body) {
    throw new Error('Invalid invitation id')
  }

  const invitations = await firebaseAdminFirestore
    .collection(`invitations`)
    .where('email', '==', body.email)
    .get()

  const activeInvitationDoc = invitations.docs.find((invitationDoc) => {
    const invitationData = invitationDoc.data() as Invitation
    return (
      invitationDoc.id === body.id &&
      dayjs(invitationData.expiresAt.toDate()).isAfter(dayjs())
    )
  })

  if (!activeInvitationDoc) {
    throw new Error('Invitation not found')
  }

  const activeInvitationData = activeInvitationDoc.data() as Invitation

  await firebaseAdminFirestore.runTransaction(async (trx) => {
    const department = await trx.get(
      firebaseAdminFirestore.doc(
        `departments/${activeInvitationData.department}`
      )
    )

    trx.create(firebaseAdminFirestore.collection('departmentMembers').doc(), {
      userDisplayName: body.displayName,
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
}
