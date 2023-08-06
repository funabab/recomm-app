import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import clsx from 'clsx'
import { BiChevronDown } from 'react-icons/bi'
import DepartmentChannelList from '@/containers/chat/DepartmentChannelList'
import DepertmentSelectionList from '@/containers/chat/DepertmentSelectionList'

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
    <html lang="en" className="w-full h-full">
      <body className={clsx(fontLato.className, 'w-full h-full')}>
        <div className="w-full h-full flex flex-col">
          <Header className="shrink-0 border-b border-white/10" />
          <div className="flex-1 min-h-0 relative">
            <div className="flex h-full">
              <div className="bg-[#3F0F3F] h-full px-3 py-4 border-r border-white/10">
                <DepertmentSelectionList />
              </div>
              <aside className="bg-[#3F0F3F] w-[260px] h-full flex flex-col">
                <div className="py-4 px-4 border-y border-white/10 shrink-0">
                  <button className="font-bold text-lg text-white bg-transparent hover:bg-white/10 transition duration-200 px-4 py-2 rounded-md flex gap-x-1 items-center">
                    <span className="whitespace-nowrap truncate">
                      LIS Department
                    </span>
                    <BiChevronDown />
                  </button>
                </div>
                <div className="mt-2 overflow-y-auto flex-1 min-h-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/60 scrollbar-thumb-rounded-md">
                  <DepartmentChannelList />
                </div>
              </aside>
              <main className="bg-white flex-1 min-w-0 min-h-0 relative">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
