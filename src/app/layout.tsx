import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const fontLato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'Recomm - Department Communication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontLato.className}>
        <Header />
      </body>
    </html>
  )
}
