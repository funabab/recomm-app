import './_styles/global.css'

import { fontLato } from '@/utils/fonts'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import RouteProgressbar from '../_components/RouteProgressbar'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Recomm App | Backoffice',
}

export default function BackofficeRootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(fontLato.variable)} data-theme="appTheme">
      <body>
        {children}
        <Toaster position="top-right" />
        <RouteProgressbar />
      </body>
    </html>
  )
}
