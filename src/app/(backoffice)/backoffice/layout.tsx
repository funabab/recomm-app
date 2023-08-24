'use client'

import { firebaseAuth } from '@/firebase/client'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  children: React.ReactNode
  auth: React.ReactNode
}

export default function BackofficeLayout({ auth, children }: Props) {
  const [user] = useAuthState(firebaseAuth)

  if (user?.providerData[0]?.providerId !== 'google.com') {
    return <>{auth}</>
  }

  return <>{children}</>
}
