import ChatMessageList from '../../components/ChatMessageList'

interface Props {
  children: React.ReactNode
}

export default function UserProfileLayout({ children }: Props) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 min-w-0 h-full">
        <ChatMessageList />
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}
