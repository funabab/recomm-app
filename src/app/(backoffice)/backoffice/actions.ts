'use server'

import { firebaseAdminFirestore } from '@/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export const createDepartment = async (formdata: FormData) => {
  const title = formdata.get('title')
  const description = formdata.get('description')

  await firebaseAdminFirestore.collection('departments').add({
    title,
    description,
    createdAt: FieldValue.serverTimestamp(),
  })

  return {
    message: 'Department created successfully',
  }
}
