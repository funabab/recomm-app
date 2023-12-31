'use client'

import DepartmentRoleVisible from '@/app/_components/DepartmentRoleVisible'
import ChannelButton from './ChannelButton'
import { LiaEdit } from 'react-icons/lia'
import { AiOutlineComment, AiOutlineFile } from 'react-icons/ai'
import ChannelListAccordion from './ChannelListAccordion'
import Link from 'next/link'
import EditDepartmentModal from './EditDepartmentModal'
import { useDepartmentValues } from './DepertmentProvider'

export default function NavigationSider() {
  const { currentDepartment } = useDepartmentValues()

  if (!currentDepartment) {
    return null
  }

  return (
    <div className="w-[262px]">
      <div className="py-2 px-3 border-b border-neutral-content flex justify-between items-center max-w-full h-16">
        <ChannelButton />

        <DepartmentRoleVisible roles={['admin', 'hod']}>
          <EditDepartmentModal
            dialogTrigger={
              <button className="btn btn-circle btn-accent text-xl text-primary shrink-0">
                <LiaEdit />
              </button>
            }
          />
        </DepartmentRoleVisible>
      </div>

      <div>
        <Link
          href={`/chat/${currentDepartment.id}/notice-board`}
          className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-primary no-animation"
        >
          <AiOutlineComment />
          Notice Board
        </Link>
        <Link
          href={`/chat/${currentDepartment.id}/resources`}
          className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-primary no-animation"
        >
          <AiOutlineFile />
          Resources
          <div className="badge badge-primary badge-sm ml-auto">
            {currentDepartment.resourcesCount}
          </div>
        </Link>

        <ChannelListAccordion collapsible />
      </div>
    </div>
  )
}
