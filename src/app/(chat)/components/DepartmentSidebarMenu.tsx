'use client'

import { useUser } from '@/app/components/AuthProtect'
import { initialFromTitleText } from '@/utils/commons'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function DepartmentSidebarMenu() {
  const user = useUser()
  const { departmentId } = useParams()

  return (
    <div className="py-[21px] w-16 flex justify-center border-r border-neutral-content">
      <div className="space-y-[14px]">
        {user?.memberships?.map((membership) => (
          <div key={membership.departmentId}>
            <Link href={`/chat/${membership.departmentId}`}>
              <div
                className="avatar placeholder cursor-pointer"
                title="Library and Information Science Department"
              >
                <div
                  className={clsx(
                    'w-8 h-8 bg-neutral rounded-[5px]',
                    departmentId === membership.departmentId &&
                      'outline-neutral-focus outline outline-[3px] outline-offset-[2px]'
                  )}
                >
                  <span className="font-lato text-[17px] font-bold text-neutral-content uppercase">
                    {initialFromTitleText(membership.departmentTitle)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
