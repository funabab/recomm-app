'use client'
import { useUser } from '@/app/components/AuthProtect'
import { initialFromTitleText } from '@/utils/commons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function UserAvatar() {
  const user = useUser()
  const { departmentId, channelId, userId } = useParams()

  const profileUrl = useMemo(() => {
    if (channelId && userId) {
      return `/chat/${departmentId}/${channelId}/profile/${userId}`
    } else if (departmentId) {
      return `/chat/${departmentId}/profile/${user?.uid}`
    } else {
      return `/chat/profile/${user?.uid}`
    }
  }, [departmentId, channelId, user, userId])

  return (
    <Link href={profileUrl} className="ml-auto" prefetch>
      <div className="avatar placeholder online [&.online:before]:!bg-[#56A97A] [&.offline:before]:!bg-[#a95656] [&:before]:!top-[unset] [&:before]:bottom-px [&:before]:!-right-px cursor-pointer">
        <div className="w-7 bg-neutral rounded">
          <span className="text-xs text-neutral-content font-lato uppercase">
            {initialFromTitleText(user?.displayName)}
          </span>
        </div>
      </div>
    </Link>
  )
}
