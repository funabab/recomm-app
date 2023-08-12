import './globals.css'

import type { Metadata } from 'next'
import { BiMenuAltLeft, BiSearch } from 'react-icons/bi'
import { RxCaretDown } from 'react-icons/rx'
import { AiFillAlert, AiOutlineFile } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import clsx from 'clsx'
import { fontLato } from '@/utils/fonts'
import ChannelListAccordion from './components/ChannelListAccordion'

export const metadata: Metadata = {
  title: 'Recomm - Department Communication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('w-full h-full', fontLato.variable)}
      data-theme="appTheme"
    >
      <body className="h-full">
        <main className="flex flex-col h-full">
          <header className="shrink-0 bg-base-300 pt-[7px] pb-[6px] justify-center items-center flex gap-x-[21px] px-5 border-b border-b-neutral-content">
            <h1 className="font-lato uppercase ml-24 font-bold text-primary underline underline-offset-4 decoration-dashed hidden lg:block">
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

            <div className="avatar placeholder online [&.online:before]:!bg-[#56A97A] [&.offline:before]:!bg-[#a95656] [&:before]:!top-[unset] [&:before]:bottom-px [&:before]:!-right-px cursor-pointer ml-auto">
              <div className="w-7 bg-neutral rounded">
                <span className="text-xs text-neutral-content font-lato">
                  DP
                </span>
              </div>
            </div>
          </header>
          <div className="drawer lg:drawer-open flex-1 relative min-h-0">
            <input
              id="department-channel-list-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content relative bg-base-100">
              <main>{children}</main>
            </div>
            <div className="drawer-side h-full">
              <label
                htmlFor="department-channel-list-drawer"
                className="drawer-overlay !bg-transparent"
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
                <div className="w-[262px]">
                  <div className="py-2 px-3 border-b border-neutral-content flex justify-between items-center">
                    <button className="btn btn-ghost text-[15px] font-lato">
                      Channel
                      <RxCaretDown />
                    </button>

                    <button className="btn btn-circle btn-accent text-xl">
                      <LiaEdit />
                    </button>
                  </div>

                  <div>
                    <button className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-primary">
                      <AiFillAlert />
                      Notice Board
                    </button>
                    <button className="btn btn-ghost font-lato font-bold text-[15px] w-full justify-start rounded-none text-neutral-700">
                      <AiOutlineFile />
                      Resources
                    </button>

                    <ChannelListAccordion collapsible />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
