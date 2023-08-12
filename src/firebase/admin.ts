import admin from 'firebase-admin'
import { initializeApp, getApps, getApp } from 'firebase-admin/app'

export const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: admin.credential.cert(
          JSON.parse(atob(process.env.FIREBASE_ADMIN_CREDENTIALS as string))
        ),
      })
    : getApp()
