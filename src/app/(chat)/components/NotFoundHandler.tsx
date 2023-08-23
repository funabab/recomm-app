'use client'

import { ErrorBoundary } from 'react-error-boundary'
import NotFound from './NotFound'

interface Props {
  children: React.ReactNode
}

export default function NotFoundErrorBoundary(props: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }: { error: Error & { digest?: string } }) => {
        if (error.digest === 'NEXT_NOT_FOUND') {
          return <NotFound />
        } else {
          throw error
        }
      }}
    >
      {props.children}
    </ErrorBoundary>
  )
}
