import React from 'react'
import { FiSearch } from 'react-icons/fi'
import AvaterIcon from './AvaterIcon'
import clsx from 'clsx'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

const Header: React.FC<Props> = ({ className, ...props }) => {
  return (
    <header className={clsx(className, 'bg-[#301134] flex items-center')}>
      <div className="relative my-2 ml-auto">
        <input
          type="search"
          placeholder="Search in Departments"
          className="border-[#654D68] border rounded bg-transparent px-10 text-white min-w-[500px] text-center outline-none peer"
        />
        <FiSearch className="text-base absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-28 text-white/70 pointer-events-none peer-placeholder-shown:visible invisible" />
      </div>
      <div className="ml-auto mr-4">
        <AvaterIcon />
      </div>
    </header>
  )
}

export default Header
