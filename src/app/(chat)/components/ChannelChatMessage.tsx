import { DepartmentChannelMessage } from '@/typings'
import { initialFromTitleText } from '@/utils/commons'
import { USER_ROLES } from '@/utils/constants'
import dayjs from 'dayjs'
import Link from 'next/link'
import { RotatingLines } from 'react-loader-spinner'
import sanitize from 'sanitize-html'

interface Props {
  message: DepartmentChannelMessage & {
    isSending?: boolean
  }
}

export default function ChannelChatMessage({
  message: { isSending, ...message },
}: Props) {
  return (
    <div className="px-[19px] py-5 border-b border-b-neutral-content last:border-b-0">
      <div className="flex flex-row items-start gap-x-[7px]">
        <Link href={{ query: { profile: message.createdBy } }}>
          <div className="avatar placeholder">
            <div className="w-[36px] rounded bg-neutral">
              <span className="text-neutral-content text-xs">
                {initialFromTitleText(message.userDisplayName)}
              </span>
            </div>
          </div>
        </Link>
        <div>
          <p className="flex items-center gap-x-[7px] font-lato text-neutral">
            <strong className="text-[15px] font-extrabold">
              {message.userDisplayName}
            </strong>
            <span className="text-xs font-medium text-neutral/80">
              {dayjs(message.createdAt?.toDate()).format(
                'MMMM DD, YYYY hh:mm A'
              )}
            </span>
            {isSending && (
              <RotatingLines
                strokeColor="#30784C"
                strokeWidth="5"
                animationDuration="0.75"
                width="16"
                visible={true}
              />
            )}
          </p>
          <span className="text-xs ml-1 font-medium text-neutral/80">
            {USER_ROLES[message.userRole]}
          </span>
          <p
            className="mt-2 font-lato text-[15px] text-neutral"
            dangerouslySetInnerHTML={{ __html: sanitize(message.content) }}
          ></p>
        </div>
      </div>
    </div>
  )
}
