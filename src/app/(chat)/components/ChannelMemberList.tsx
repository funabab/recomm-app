'use client'

import Loader from '@/app/components/Loader'
import { firebaseFirestore } from '@/firebase/client'
import { departmentChannelMemberConverter } from '@/firebase/converters'
import { UserRole } from '@/typings'
import { initialFromTitleText } from '@/utils/commons'
import { USER_ROLES } from '@/utils/constants'
import { collection, query, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

interface Props {
  channelId: string
  filter?: string
}

const userRoleRanking: Record<UserRole, number> = {
  admin: 3,
  hod: 2,
  staff: 1,
}

export default function ChannelMemberList({ channelId, filter }: Props) {
  const [members, isLoading] = useCollectionData(
    query(
      collection(firebaseFirestore, 'departmentChannelMembers'),
      where('channelId', '==', channelId)
    ).withConverter(departmentChannelMemberConverter)
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <ul className="h-full space-y-5 overflow-y-auto">
      {members
        ?.sort(
          (a, b) => userRoleRanking[a.userRole] - userRoleRanking[b.userRole]
        )
        .filter((member) =>
          filter
            ? member.userDisplayName
                .toLowerCase()
                .includes(filter.toLowerCase())
            : true
        )
        .map((member) => (
          <li className="flex items-center gap-x-2" key={member.id}>
            <div className="avatar placeholder">
              <div className="w-[36px] rounded bg-neutral">
                <span className="text-neutral-content text-xs">
                  {initialFromTitleText(member.userDisplayName)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[15px] font-extrabold">
                {member.userDisplayName}
              </p>
              <span className="text-xs ml-1 font-medium text-neutral/80">
                {USER_ROLES[member.userRole]}
              </span>
            </div>
          </li>
        ))}
    </ul>
  )
}
