import './styles/global.css'

import { fontLato } from '@/utils/fonts'
import clsx from 'clsx'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Recomm App | Backoffice',
}

export default function BackofficeRootLayout({ children }: Props) {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <html lang="en" className={clsx(fontLato.variable)} data-theme="appTheme">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
