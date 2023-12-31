'use client'

import ChannelChatMessage from '@/app/(chat)/_components/ChannelChatMessage'
import ChannelChatMessageInput from '@/app/(chat)/_components/ChannelChatMessageInput'
import { useDepartmentValues } from '@/app/(chat)/_components/DepertmentProvider'
import { useUser } from '@/app/_components/AuthProtect'
import { LoaderScreen } from '@/app/_components/Loader'
import { firebaseFirestore } from '@/firebase/client'
import {
  departmentBoardMessageConverter,
  departmentConverter,
} from '@/firebase/converters'
import { num } from '@/utils/commons'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  or,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { useTransition } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { toast } from 'react-hot-toast'
import { AiOutlineMessage } from 'react-icons/ai'

export default function DepartmentNoticeBoard() {
  const { currentDepartment } = useDepartmentValues()
  const user = useUser()
  const [boardMessages, isLoadingBoardMessages] = useCollectionData(
    currentDepartment && user
      ? query(
          collection(firebaseFirestore, 'departmentBoardMessages'),
          or(
            where('visibleTo', 'in', ['@', currentDepartment.id]),
            where('author', '==', user.uid)
          ),
          orderBy('createdAt')
        ).withConverter(departmentBoardMessageConverter)
      : null
  )
  const [departments] = useCollectionData(
    collection(firebaseFirestore, 'departments').withConverter(
      departmentConverter
    )
  )

  const [_isPendingAddingMessage, startAddingMessageTransaction] =
    useTransition()

  const userRole = user?.memberships?.find(
    (membership) => membership.departmentId === currentDepartment?.id
  )?.role

  const canPost = userRole === 'admin' || userRole === 'hod'

  if (!currentDepartment || !user || isLoadingBoardMessages) {
    return <LoaderScreen />
  }

  return (
    <main className="w-full h-full flex flex-col">
      <header className="px-[22px] border-b border-b-neutral-content flex flex-row items-center justify-center h-16">
        <div>
          <div className="flex flex-row gap-x-1 items-center">
            <strong className="font-lato text-[18px] text-center w-full">
              General Notice Board
            </strong>
          </div>
          <p className="text-[13px] m-0 text-neutral/60 mt-px flex items-center">
            <AiOutlineMessage />
            <span className="pl-1 pr-2 border-r border-r-neutral-content">
              {num(boardMessages?.length)}
            </span>
            <span className="px-2 truncate max-w-[10rem] lg:max-w-2xl">
              General Departments Notice Board
            </span>
          </p>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary">
          {boardMessages?.map((boardMessage) => (
            <ChannelChatMessage
              key={boardMessage.id}
              message={{
                ...boardMessage,
                departmentTitle: boardMessage.userDepartmentTitle,
              }}
              onDeleteMessage={async (message) => {
                await deleteDoc(
                  doc(firebaseFirestore, 'departmentBoardMessages', message.id)
                )
                toast.success('Message deleted successfully', {
                  position: 'top-right',
                })
              }}
            />
          ))}
        </div>
        <div className="shrink-0">
          <ChannelChatMessageInput
            disabled={!canPost}
            references={[
              {
                label: '@ Everyone',
                value: '@',
              },
              ...(departments
                ? departments.map((department) => ({
                    label: `${department.title} department`,
                    value: department.id,
                  }))
                : []),
            ]}
            placeholder={
              canPost
                ? 'Post to general notice board'
                : 'Only Admins and HODs can post here'
            }
            onSendMessage={async (message, reference) => {
              if (message) {
                startAddingMessageTransaction(async () => {
                  await addDoc(
                    collection(firebaseFirestore, 'departmentBoardMessages'),
                    {
                      content: message,
                      userDisplayName: user?.displayName,
                      userRole: user?.memberships?.find(
                        (membership) =>
                          membership.departmentId === currentDepartment?.id
                      )?.role,
                      userDepartmentTitle: currentDepartment?.title,
                      userDepartmentId: currentDepartment?.id,

                      visibleTo: reference,
                      author: user?.uid,
                      createdAt: serverTimestamp(),
                    }
                  )
                })
              }
            }}
          />
        </div>
      </div>
    </main>
  )
}
