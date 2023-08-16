import admin from 'firebase-admin'
import { initializeApp, getApps, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

export const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: admin.credential.cert(
          JSON.parse(atob(process.env.FIREBASE_ADMIN_CREDENTIALS as string))
        ),
      })
    : getApp()

export const firebaseAdminAuth = getAuth(firebaseAdmin)
export const firebaseAdminFirestore = getFirestore(firebaseAdmin)
