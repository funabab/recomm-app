'use client'

import { useRouter } from 'next/navigation'
import AuthLoginCard from './AuthLoginCard'

export default function LoginCard() {
  const router = useRouter()

  return (
    <AuthLoginCard
      className="shadow-2xl"
      onUserLoggedIn={() => {
        router.replace('/chat')
      }}
    />
  )
}
