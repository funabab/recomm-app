'use client'

import { firebaseAuth, firebaseFirestore } from '@/firebase/client'
import { userConverter } from '@/firebase/converters'
import { doc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface Props {
  redirectTo: string
  children: React.ReactNode
}

export default function AuthRedirect({ redirectTo, children }: Props) {
  const [firebaseUser] = useAuthState(firebaseAuth)
  const [_user, _isLoadingUser, _error, userSnapshot] = useDocumentData(
    firebaseUser
      ? doc(firebaseFirestore, 'users', firebaseUser.uid).withConverter(
          userConverter
        )
      : null
  )
  const router = useRouter()

  useEffect(() => {
    if (userSnapshot && !userSnapshot.exists) {
      router.replace(redirectTo)
    }
  }, [userSnapshot, router, redirectTo])

  if (!userSnapshot?.exists) {
    return null
  }

  return children
}
