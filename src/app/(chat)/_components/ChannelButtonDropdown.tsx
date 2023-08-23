'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { initialFromTitleText } from '@/utils/commons'
import { BiLogOut } from 'react-icons/bi'
import DepartmentRoleVisible from '@/app/_components/DepartmentRoleVisible'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import { useDepartmentValues } from './DepertmentProvider'
import { useSignOut } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/firebase/client'
import React, { useRef } from 'react'
import InviteMemberToDepartmentModal, {
  InviteMemberToDepartmentModalRef,
} from './InviteMemberToDepartmentModal'

interface Props extends DropdownMenu.DropdownMenuProps {
  triggerElement?: React.ReactNode
}

export default function ChannelButtonPopup({
  triggerElement,
  ...props
}: Props) {
  const { currentDepartment } = useDepartmentValues()
  const [signOut] = useSignOut(firebaseAuth)
  const inviteMemeberToDepartmentModalRef =
    useRef<InviteMemberToDepartmentModalRef>(null)

  return (
    <React.Fragment>
      <DropdownMenu.Root {...props}>
        {triggerElement && (
          <DropdownMenu.Trigger asChild>{triggerElement}</DropdownMenu.Trigger>
        )}

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="rounded py-5 w-[302px] max-w-[95vw] bg-white text-accent-content shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity]"
            sideOffset={5}
            collisionPadding={{
              left: 10,
            }}
          >
            <DropdownMenu.Item className="outline-none">
              <div className="flex px-5 gap-x-2 items-center font-lato">
                <div className="avatar placeholder">
                  <div className="w-9 h-9 bg-neutral rounded">
                    <span className="text-neutral-content">
                      {initialFromTitleText(currentDepartment?.title)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs">ICT</p>
                  <p className="text-[10px]">
                    {currentDepartment?.description}
                  </p>
                </div>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-[1px] bg-neutral-content mt-5" />
            <DepartmentRoleVisible roles={['admin', 'hod']}>
              <DropdownMenu.Item className="outline-none">
                <button className="btn btn-ghost btn-block btn-sm text-xs rounded-none justify-start no-animation">
                  <LiaEdit />
                  Edit Department
                </button>
              </DropdownMenu.Item>
            </DepartmentRoleVisible>
            <DepartmentRoleVisible roles={['admin', 'hod']}>
              <DropdownMenu.Item className="outline-none">
                <button
                  className="btn btn-ghost btn-block btn-sm text-xs rounded-none justify-start no-animation"
                  onClick={() =>
                    inviteMemeberToDepartmentModalRef.current?.showModal()
                  }
                >
                  <AiOutlineUserAdd />
                  Invite member
                </button>
              </DropdownMenu.Item>
            </DepartmentRoleVisible>
            <DropdownMenu.Separator className="h-[1px] bg-neutral-content" />

            <DropdownMenu.Item className="outline-none">
              <button
                className="btn btn-ghost btn-block btn-sm text-xs rounded-none justify-start no-animation text-red-700"
                onClick={() => signOut()}
              >
                <BiLogOut className="text-base" /> Logout
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {currentDepartment && (
        <InviteMemberToDepartmentModal
          departmentId={currentDepartment.id}
          ref={inviteMemeberToDepartmentModalRef}
        />
      )}
    </React.Fragment>
  )
}
