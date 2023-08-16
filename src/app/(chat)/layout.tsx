import './styles/globals.css'

import type { Metadata } from 'next'
import { BiMenuAltLeft, BiSearch } from 'react-icons/bi'
import clsx from 'clsx'
import { fontLato } from '@/utils/fonts'
import AuthProtect from '../components/AuthProtect'
import UserAvatar from './components/UserAvatar'

export const metadata: Metadata = {
  title: 'Recomm - Department Communication',
}

interface Props {
  children: React.ReactNode
  navigation: React.ReactNode
}

export default function AppRootLayout({ children, navigation }: Props) {
  return (
    <AuthProtect>
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
              <div className="relative flex-1 max-w-[500px] lg:ml-24">
                <input
                  type="search"
                  className="input input-bordered flex-1 bg-transparent text-[13px] h-6 w-full text-center placeholder-gray-500 peer font-lato"
                  placeholder="Search Channel"
                />
                <BiSearch className="absolute left-1/2 top-1/2 -translate-y-1 h-3 text-gray-500 -translate-x-[70px] hidden peer-placeholder-shown:inline-block" />
              </div>
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
                  <div className="py-[21px] px-[14px] border-r border-neutral-content">
                    <div className="space-y-[14px]">
                      <div>
                        <div
                          className="avatar placeholder cursor-pointer"
                          title="Library and Information Science Department"
                        >
                          <div className="w-8 h-8 bg-neutral rounded-[5px]">
                            <span className="font-lato text-[17px] font-bold text-neutral-content">
                              L
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="avatar placeholder cursor-pointer"
                          title="Computer Science Department"
                        >
                          <div className="w-8 h-8 bg-neutral rounded-[5px] outline-neutral-focus outline outline-[3px] outline-offset-[2px]">
                            <span className="font-lato text-[17px] font-bold text-neutral-content">
                              C
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {navigation}
                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    </AuthProtect>
  )
}
