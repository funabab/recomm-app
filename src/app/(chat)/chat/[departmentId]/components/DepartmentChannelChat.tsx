'use client'

import {
  AiOutlineMessage,
  AiOutlineStar,
  AiOutlineUserAdd,
} from 'react-icons/ai'
import ChannelChatMessageInput from '@/app/(chat)/components/ChannelChatMessageInput'
import ChannelChatMessage from '@/app/(chat)/components/ChannelChatMessage'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import { departmentChannelMessageConverter } from '@/firebase/converters'
import { LoaderScreen } from '@/app/components/Loader'
import pluralize from 'pluralize'
import { num } from '@/utils/commons'
import { useDepartmentValues } from '@/app/(chat)/components/DepertmentProvider'
import { useTransition } from 'react'
import { useUser } from '@/app/components/AuthProtect'

export default function DepartmentChannelChat() {
  const { currentChannel } = useDepartmentValues()
  const user = useUser()
  const [departmentChannelMessages, isLoadingMessages] = useCollectionData(
    currentChannel &&
      query(
        collection(
          firebaseFirestore,
          'departmentChannels',
          currentChannel.id,
          'messages'
        ),
        orderBy('createdAt')
      ).withConverter(departmentChannelMessageConverter)
  )
  const [isPendingAddingMessage, startAddingMessageTransaction] =
    useTransition()

  if (!currentChannel || isLoadingMessages) {
    return <LoaderScreen />
  }

  return (
    <div className="w-full h-full flex flex-col">
      <header className="pt-[13px] pb-[3px] px-[22px] border-b border-b-neutral-content flex flex-row items-center justify-between">
        <div>
          <div className="flex flex-row gap-x-1 items-center">
            <strong className="font-lato text-[15px]">
              {currentChannel?.title}
            </strong>
            <button className="text-xs">
              <AiOutlineStar />
            </button>
          </div>
          <p className="text-[13px] m-0 text-neutral/60 mt-px flex items-center">
            <AiOutlineMessage />
            <span className="pl-1 pr-2 border-r border-r-neutral-content">
              13
            </span>
            <span className="px-2 truncate max-w-[10rem] lg:max-w-2xl">
              {currentChannel?.description}
            </span>
          </p>
        </div>
        <div className="flex flex-row items-center text-neutral/50 font-lato gap-x-2">
          <span className="text-neutral font-medium text-sm">
            {num(currentChannel?.membersCount)}{' '}
            {pluralize('Member', num(currentChannel?.membersCount))}
          </span>
          <button className="btn btn-ghost btn-circle text-neutral/50 text-2xl">
            <AiOutlineUserAdd />
          </button>
        </div>
      </header>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary">
          {departmentChannelMessages?.map((departmentChannelMessage) => (
            <ChannelChatMessage
              key={departmentChannelMessage.id}
              message={departmentChannelMessage}
            />
          ))}
        </div>
        <div className="shrink-0">
          <ChannelChatMessageInput
            placeholder={`Message # ${currentChannel.title}`}
            onSendMessage={(message) => {
              startAddingMessageTransaction(async () => {
                await addDoc(
                  collection(
                    firebaseFirestore,
                    'departmentChannels',
                    currentChannel.id,
                    'messages'
                  ),
                  {
                    content: message,
                    userDisplayName: user?.displayName,
                    userRole: user?.memberships?.find(
                      (membership) =>
                        membership.departmentId === currentChannel.departmentId
                    )?.role,
                    createdBy: user?.uid,
                    createdAt: serverTimestamp(),
                  }
                )
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
