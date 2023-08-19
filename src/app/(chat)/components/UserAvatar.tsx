'use client'

import { useUser } from '@/app/components/AuthProtect'
import { initialFromTitleText } from '@/utils/commons'
import Link from 'next/link'

export default function UserAvatar() {
  const user = useUser()

  return (
    <Link
      href={{
        query: {
          profile: user?.uid,
        },
      }}
      className="ml-auto"
      prefetch
    >
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
