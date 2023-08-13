import './styles/global.css'

import { fontLato } from '@/utils/fonts'
import clsx from 'clsx'
import { Metadata } from 'next'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Recomm App',
}

export default function AppRootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(fontLato.variable)} data-theme="appTheme">
      <body>{children}</body>
    </html>
  )
}
