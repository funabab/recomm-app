import React from 'react'

interface Props {}

const AvaterIcon = () => {
  return (
    <div className="relative">
      <div className="h-11 w-11 bg-blue-600 relative"></div>
      <span className="inline-block w-4 h-4 border-2 rounded-full border-black -bottom-1 -right-1 absolute bg-green-700"></span>
    </div>
  )
}

export default AvaterIcon
