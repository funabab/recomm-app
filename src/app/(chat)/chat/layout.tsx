import ProfileRightSider from '../components/ProfileRightSider'

interface Props {
  children: React.ReactNode
}

export default function ChannelChatLayout({ children }: Props) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 min-w-0 h-full">{children}</div>
      <div className="shrink-0">
        <ProfileRightSider />
      </div>
    </div>
  )
}
