interface Props {
  children: React.ReactNode
  profile: React.ReactNode
}

export default function ChannelChatLayout({ children, profile }: Props) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 min-w-0 h-full">{children}</div>
      <div className="shrink-0">{profile}</div>
    </div>
  )
}
