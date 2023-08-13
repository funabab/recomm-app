'use client'

import { Department, Invitation } from '@/typings'
import { USER_ROLES } from '@/utils/constants'

interface Props {
  department: Department
  invitation: Invitation
}

export default function UserInvitationCard({ department, invitation }: Props) {
  return (
    <div className="w-96 max-w-[95vw] rounded-lg bg-base-300 py-10 flex flex-col items-center px-10 relative">
      <div className="avatar placeholder">
        <div className="w-24 rounded bg-neutral">
          <span className="font-lato font-bold text-xl text-neutral-content">
            {department.title[0]}
          </span>
        </div>
      </div>
      <p className="mt-5 text-center font-lato font-medium">
        You&apos;ve been invited to join {department.title} department as{' '}
        {USER_ROLES[invitation.role]}
      </p>
      <p className="mt-5 text-xl font-lato font-bold text-center">
        {department.description}
      </p>
      <div className="mt-6 w-full">
        <button className="btn btn-primary btn-block">Accept Invitation</button>
      </div>
    </div>
  )
}
