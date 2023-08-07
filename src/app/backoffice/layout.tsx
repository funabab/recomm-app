import React from 'react'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Metadata } from 'next'
import clsx from 'clsx'
import { Lato } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Backoffice',
}

const fontLato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'] })

const BackofficeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  if (process.env.NODE_ENV === 'production') {
    return notFound()
  }

  return (
    <html lang="en" className="w-full h-full">
      <body className={clsx(fontLato.className, 'w-full h-full')}>
        {children}
      </body>
    </html>
  )
}

export default BackofficeLayout
