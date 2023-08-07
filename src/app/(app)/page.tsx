import DepartmentChatContainer from '@/containers/chat/DepartmentChatContainer'

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <div className="h-full">
      <DepartmentChatContainer />
    </div>
  )
}

export default Home
