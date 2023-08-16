'use client'
import { useUser } from '@/app/components/AuthProtect'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function UserAvatar() {
  const user = useUser()
  const { departmentId, channelId } = useParams()

  const profileUrl = useMemo(() => {
    if (channelId) {
      return `/chat/${departmentId}/${channelId}/profile/1234`
    } else if (departmentId) {
      return `/chat/${departmentId}/profile/1234`
    } else {
      return `/chat/profile/1234`
    }
  }, [departmentId, channelId])

  return (
    <Link href={profileUrl} className="ml-auto">
      <div className="avatar placeholder online [&.online:before]:!bg-[#56A97A] [&.offline:before]:!bg-[#a95656] [&:before]:!top-[unset] [&:before]:bottom-px [&:before]:!-right-px cursor-pointer">
        <div className="w-7 bg-neutral rounded">
          <span className="text-xs text-neutral-content font-lato">DP</span>
        </div>
      </div>
    </Link>
  )
}
