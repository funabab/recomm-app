interface Props {
  children: React.ReactNode
}

export default function ChannelChatLayout({ children }: Props) {
  return <div className="w-full h-full">{children}</div>
}
