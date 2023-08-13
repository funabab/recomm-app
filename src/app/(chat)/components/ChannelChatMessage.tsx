interface Props {
  message: string
}

export default function ChannelChatMessage({ message }: Props) {
  return (
    <div className="px-[19px] py-5 border-b border-b-neutral-content last:border-b-0">
      <div className="flex flex-row items-start gap-x-[7px]">
        <div className="avatar placeholder">
          <div className="w-[36px] rounded bg-neutral">
            <span className="text-neutral-content text-xs">DP</span>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-x-[7px] font-lato text-neutral">
            <strong className="text-[15px] font-extrabold">Dr. Peters</strong>
            <span className="text-xs font-medium text-neutral/80">6:49 PM</span>
          </p>
          <span className="text-xs ml-1 font-medium text-neutral/80">
            Adminstrator 👷🏾‍♂️
          </span>
          <p className="mt-2 font-lato text-[15px] text-neutral">{message}</p>
        </div>
      </div>
    </div>
  )
}
