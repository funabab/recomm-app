import { ErrorBoundary } from 'react-error-boundary'
import DepartmentNotFoundProvider from '../components/DepartmentNotFoundProvider'
import ProfileRightSider from '../components/ProfileRightSider'
import NotFound from './not-found'
import NotFoundErrorBoundary from '../components/NotFoundHandler'

interface Props {
  children: React.ReactNode
}

export default function ChannelChatLayout({ children }: Props) {
  return (
    <NotFoundErrorBoundary>
      <DepartmentNotFoundProvider>
        <div className="w-full h-full flex flex-row">
          <div className="flex-1 min-w-0 h-full">{children}</div>
          <div className="shrink-0">
            <ProfileRightSider />
          </div>
        </div>
      </DepartmentNotFoundProvider>
    </NotFoundErrorBoundary>
  )
}
