'use client'

import { useRouter } from 'next/navigation'
import { RxCross2 } from 'react-icons/rx'

export default function UserProfile() {
  const router = useRouter()
  return (
    <div className="border-l border-l-neutral-content h-full w-full absolute top-0 left-0 lg:static lg:w-96 bg-base-100">
      <div className="flex flex-row justify-between items-center px-5 py-2 border-b border-b-neutral-content">
        <h2 className="font-lato text-xl text-neutral font-bold">Profile</h2>
        <button
          className="btn btn-ghost btn-circle text-xl"
          onClick={() => router.back()}
        >
          <RxCross2 />
        </button>
      </div>

      <div className="px-5 mt-10">
        <div className="flex items-center justify-center flex-col">
          <div className="avatar placeholder">
            <div className="w-40 rounded-md bg-neutral">
              <span className="font-lato text-6xl text-neutral-content">
                DP
              </span>
            </div>
          </div>

          <strong className="text-2xl mt-5">Dr. David Peters</strong>
          <p>Adminstrator 👷🏾‍♂️</p>
        </div>
      </div>
    </div>
  )
}
