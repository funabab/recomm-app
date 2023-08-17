'use client'

import React from 'react'
import Loader from '@/app/components/Loader'
import { firebaseFirestore } from '@/firebase/client'
import { doc } from 'firebase/firestore'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { initialFromTitleText } from '@/utils/commons'
import { RxCross2 } from 'react-icons/rx'
import { USER_ROLES } from '@/utils/constants'
import { UserRole } from '@/typings'
import { userConverter } from '@/firebase/converters'

export default function ProfileRightSider() {
  const searchParams = useSearchParams()
  const { departmentId } = useParams()
  const userId = searchParams.get('profile')
  const [user, isLoading] = useDocumentData(
    userId
      ? doc(firebaseFirestore, 'users', userId).withConverter(userConverter)
      : null
  )
  const router = useRouter()

  if (!userId) {
    return null
  }

  return (
    <div className="border-l border-l-neutral-content h-full w-full absolute top-0 left-0 lg:static lg:w-96 bg-base-100">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <div className="flex flex-row justify-between items-center px-5 py-2 border-b border-b-neutral-content">
            <h2 className="font-lato text-xl text-neutral font-bold">
              Profile
            </h2>
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
                    {initialFromTitleText(user?.displayName)}
                  </span>
                </div>
              </div>

              <strong className="text-2xl mt-5">{user?.displayName}</strong>
              {departmentId && user?.memberships && (
                <p>
                  {
                    USER_ROLES[
                      user.memberships.find(
                        (member) => member.departmentId === departmentId
                      )?.role as UserRole
                    ]
                  }
                </p>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
