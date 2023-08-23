'use client'

import { useDepartmentValues } from './DepertmentProvider'
import ChannelButtonPopup from './ChannelButtonDropdown'
import { RxCaretDown } from 'react-icons/rx'

export default function ChannelButton() {
  const { currentDepartment } = useDepartmentValues()

  return (
    <ChannelButtonPopup
      triggerElement={
        <button
          className="btn btn-ghost btn-sm font-lato text-left text-primary outline-none"
          disabled={!currentDepartment}
        >
          {currentDepartment?.title}
          <RxCaretDown />
        </button>
      }
    />
  )
}
