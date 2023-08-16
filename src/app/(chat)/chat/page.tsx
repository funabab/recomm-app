'use client'

import { useUser } from '@/app/components/AuthProtect'
import { LoaderScreen } from '@/app/components/Loader'
import IconChat from '@/app/components/icons/IconChat'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ChatHome() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && user.memberships) {
      router.replace(`/chat/${user.memberships[0].departmentId}`)
    }
  }, [user, router])

  if (!user || (user.memberships && user.memberships.length > 0)) {
    return <LoaderScreen />
  }

  return (
    <div className="w-full h-full justify-center items-center font-lato flex flex-col gap-y-2">
      <IconChat className="h-40" />
      <h2 className="text-2xl font-bold text-neutral mt-5">Recomm App</h2>
      <p>
        {user.memberships && user.memberships.length > 0 ? (
          'You can engage in your departmental conversations in available channels'
        ) : (
          <span className="text-red-600 font-bold text-lg">
            You are not a member of any department, kindly contact technical
            administrator
          </span>
        )}
      </p>
    </div>
  )
}
