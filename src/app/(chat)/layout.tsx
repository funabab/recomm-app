import './_styles/globals.css'

import type { Metadata } from 'next'
import { BiMenuAltLeft, BiSearch } from 'react-icons/bi'
import clsx from 'clsx'
import { fontLato } from '@/utils/fonts'
import AuthProtect from '../_components/AuthProtect'
import UserAvatar from './_components/UserAvatar'
import DepartmentSidebarMenu from './_components/DepartmentSidebarMenu'
import { Toaster } from 'react-hot-toast'
import DepartmentProvider from './_components/DepertmentProvider'
import NavigationSider from './_components/NavigationSider'
import RouteProgressbar from '../_components/RouteProgressbar'
import SearchBar from './_components/SearchBar'

export const metadata: Metadata = {
  title: 'Recomm - Department Communication',
}

interface Props {
  children: React.ReactNode
}

export default function AppRootLayout({ children }: Props) {
  return (
    <AuthProtect>
      <DepartmentProvider>
        <html
          lang="en"
          className={clsx('w-full h-full', fontLato.variable)}
          data-theme="appTheme"
        >
          <body className="h-full overscroll-contain">
            <main className="flex flex-col h-full">
              <header className="shrink-0 bg-base-300 pt-[7px] pb-[6px] justify-center items-center flex gap-x-[21px] px-5 border-b border-b-neutral-content">
                <h1 className="font-lato uppercase ml-20 font-bold text-primary underline underline-offset-4 decoration-dashed hidden lg:block">
                  Recomm App
                </h1>
                <label
                  className="btn btn-ghost lg:hidden self-center h-auto min-h-0 px-0 text-2xl mr-4"
                  htmlFor="department-channel-list-drawer"
                >
                  <BiMenuAltLeft />
                </label>
                <SearchBar />
                <UserAvatar />
              </header>
              <div className="drawer lg:drawer-open flex-1 relative min-h-0">
                <input
                  id="department-channel-list-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content min-h-0 relative bg-base-100">
                  <main className="w-full h-full relative">{children}</main>
                </div>
                <div className="drawer-side h-full">
                  <label
                    htmlFor="department-channel-list-drawer"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu h-full bg-base-200 text-base-content px-0 py-0 flex flex-row">
                    <DepartmentSidebarMenu />
                    <NavigationSider />
                  </div>
                </div>
              </div>
            </main>
            <Toaster />
            <RouteProgressbar />
          </body>
        </html>
      </DepartmentProvider>
    </AuthProtect>
  )
}
