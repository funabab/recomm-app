import clsx from 'clsx'
import React from 'react'

interface Props {
  title: string
  selected?: boolean
}

const DepartmentIcon: React.FC<Props> = ({ title, selected }) => {
  return (
    <div
      title={title}
      className={clsx(
        'bg-[#616061] text-2xl text-white w-10 h-10 font-bold rounded-lg flex justify-center items-center select-none',
        {
          'outline-4 outline-white outline outline-offset-2': selected,
        }
      )}
    >
      {title[0]}
    </div>
  )
}

export default DepartmentIcon
