'use client'

import { RxCaretDown } from 'react-icons/rx'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSignOut } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/firebase/client'

export default function ChannelButton() {
  const [signOut] = useSignOut(firebaseAuth)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn btn-ghost text-[15px] font-lato text-primary outline-none">
          Channel
          <RxCaretDown />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded py-5 w-[302px] max-w-[95vw] bg-white text-accent-content shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity]"
          sideOffset={5}
          collisionPadding={{
            left: 10,
          }}
        >
          <DropdownMenu.Item className="outline-none">
            <div className="flex px-5 gap-x-2 items-center font-lato">
              <div className="avatar placeholder">
                <div className="w-9 h-9 bg-neutral rounded">
                  <span className="text-neutral-content">I</span>
                </div>
              </div>
              <div>
                <p className="text-xs">ICT</p>
                <p className="text-[10px]">
                  Information and Communication Technology
                </p>
              </div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-neutral-content mt-5" />
          <DropdownMenu.Item className="outline-none">
            <button
              className="btn btn-ghost btn-block btn-sm text-xs rounded-none justify-start no-animation"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
