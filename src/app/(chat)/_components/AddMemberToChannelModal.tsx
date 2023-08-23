'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import React, { useImperativeHandle, useState, useTransition } from 'react'
import { useDepartmentValues } from './DepertmentProvider'
import { initialFromTitleText, num } from '@/utils/commons'
import pluralize from 'pluralize'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import {
  departmentChannelMemberConverter,
  userConverter,
} from '@/firebase/converters'
import Loader from '@/app/_components/Loader'
import { UserRole } from '@/typings'
import { USER_ROLES } from '@/utils/constants'
import { addMemberToChannel } from '@/app/_actions/departmentChannel'
import { toast } from 'react-hot-toast'
import DepartmentRoleVisible from '@/app/_components/DepartmentRoleVisible'

const userRoleRanking: Record<UserRole, number> = {
  admin: 3,
  hod: 2,
  staff: 1,
}

interface Props {}

export interface AddMemberToChannelModalRef {
  showModal: () => void
}

export default React.forwardRef<AddMemberToChannelModalRef, Props>(
  function AddMemberToChannelModal(props: Props, ref) {
    const { currentChannel, currentDepartment } = useDepartmentValues()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isPendingAddMember, startAddUserTransition] = useTransition()
    const [channelMembers, isLoadingChannelMembers] = useCollectionData(
      query(
        collection(firebaseFirestore, 'departmentChannelMembers'),
        where('channelId', '==', currentChannel?.id)
      ).withConverter(departmentChannelMemberConverter)
    )

    const [users, isLoadingUsers] = useCollectionData(
      collection(firebaseFirestore, 'users').withConverter(userConverter)
    )
    const channelMemberIds = channelMembers?.map((member) => member.userId)
    const availableUsers = users?.map((user) => ({
      ...user,
      role: user.memberships?.find(
        (member) => member.departmentId === currentChannel?.departmentId
      )?.role,
    }))

    useImperativeHandle(ref, () => ({
      showModal() {
        setIsOpen(true)
      },
    }))

    if (!currentChannel || !channelMemberIds) {
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
              {isLoadingUsers || isLoadingChannelMembers ? (
                <Loader />
              ) : (
                <ul className="h-full space-y-5 overflow-y-auto">
                  {availableUsers
                    ?.sort(
                      (a, b) =>
                        userRoleRanking[b.role as UserRole] -
                        userRoleRanking[a.role as UserRole]
                    )
                    .filter((member) =>
                      search
                        ? (member.displayName || '')
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        : true
                    )
                    .map((member) => (
                      <li
                        className="flex items-center justify-between"
                        key={member.uid}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="avatar placeholder">
                            <div className="w-[36px] rounded bg-neutral">
                              <span className="text-neutral-content text-xs">
                                {initialFromTitleText(member.displayName || '')}
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-[15px] font-extrabold">
                              {member.displayName}
                            </p>
                            <span className="text-xs ml-1 font-medium text-neutral/80">
                              {USER_ROLES[member.role as UserRole]}
                            </span>
                          </div>
                        </div>

                        {!channelMemberIds.includes(member.uid) &&
                          currentChannel.type === 'private' && (
                            <DepartmentRoleVisible roles={['admin', 'hod']}>
                              <button
                                className="btn btn-ghost btn-sm text-primary"
                                onClick={() => {
                                  startAddUserTransition(async () => {
                                    try {
                                      const { message } =
                                        await addMemberToChannel({
                                          channelId: currentChannel.id,
                                          memberId: member.uid,
                                        })
                                      toast.success(message)
                                    } catch (e) {
                                      const err = e as Error
                                      toast.error(err.message)
                                    }
                                  })
                                }}
                                disabled={isPendingAddMember}
                              >
                                Add
                              </button>
                            </DepartmentRoleVisible>
                          )}
                      </li>
                    ))}
                </ul>
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
