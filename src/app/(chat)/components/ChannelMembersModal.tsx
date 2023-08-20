'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import React, { useImperativeHandle, useState } from 'react'
import { useDepartmentValues } from './DepertmentProvider'
import { num } from '@/utils/commons'
import pluralize from 'pluralize'
import ChannelMemberList from './ChannelMemberList'
import DepartmentMemberList from './DepartmentMemberList'

interface Props {}

export interface ChannelMembersModalRef {
  showModal: () => void
}

export default React.forwardRef<ChannelMembersModalRef, Props>(
  function ChannelMembersModal(props: Props, ref) {
    const { currentChannel, currentDepartment } = useDepartmentValues()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    useImperativeHandle(ref, () => ({
      showModal() {
        setIsOpen(true)
      },
    }))

    if (!currentChannel) {
      return null
    }

    const membersCount = num(
      currentChannel.type === 'public'
        ? currentDepartment?.membersCount
        : currentChannel.membersCount
    )

    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed flex flex-col top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium shrink-0">
              {membersCount} {pluralize('Member', membersCount)} in #
              {currentChannel.title}
            </Dialog.Title>

            <div className="shrink-0 mt-5">
              <button className="btn btn-ghost text-primary btn-sm normal-case">
                Add Member to Channel
              </button>
            </div>

            <div className="my-5">
              <input
                type="search"
                placeholder="Search members"
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex-1 min-h-0 relative mt-5">
              {currentChannel.type === 'public' ? (
                <DepartmentMemberList
                  departmentId={currentChannel.departmentId}
                  filter={search}
                />
              ) : (
                <ChannelMemberList
                  channelId={currentChannel.id}
                  filter={search}
                />
              )}
            </div>

            <Dialog.Close asChild>
              <button
                className="btn btn-ghost btn-circle text-xl absolute top-[10px] right-[10px]"
                aria-label="Close"
              >
                <RxCross2 />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
