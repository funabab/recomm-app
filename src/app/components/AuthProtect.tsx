'use client'

import { createContext, useContext, useEffect } from 'react'
import { User } from '@/typings'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth, firebaseFirestore } from '@/firebase/client'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { userConverter } from '@/firebase/converters'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
  redirectTo?: string
}

type AuthContextValue = { user: User | undefined }

export const AuthContext = createContext<AuthContextValue | null>(null)

export default function AuthProtect({ children, redirectTo = '/' }: Props) {
  const [firebaseUser] = useAuthState(firebaseAuth)
  const [user, _isLoadingUser, _error, userSnapshot] = useDocumentData(
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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export function useUser() {
  const auth = useContext(AuthContext)

  if (auth === null) {
    throw new Error('useUser hook must be used within a AuthProvider')
  }

  return auth.user
}
