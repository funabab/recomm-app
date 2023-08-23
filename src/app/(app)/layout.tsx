import './_styles/global.css'

import { fontLato } from '@/utils/fonts'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Recomm App',
}

export default function AppRootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(fontLato.variable)} data-theme="appTheme">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
