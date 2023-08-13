'use client'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase/client'
import { invitationConverter } from '@/firebase/converters'
import dayjs from 'dayjs'
import Loader from '@/app/components/Loader'
import { useTransition } from 'react'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { deleteUserInvitation } from '../actions'

export default function BackofficeTabInvitations() {
  const [invitations, isLoading] = useCollectionData(
    query(
      collection(firebaseFirestore, 'invitations').withConverter(
        invitationConverter
      ),
      orderBy('createdAt', 'desc')
    )
  )
  const [isDeleteInvitationPending, startDeleteInvitationTransition] =
    useTransition()

  return (
    <div className="py-5">
      <div className="overflow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Invitee Name</th>
                <th>Invitee Email</th>
                <th>Sent At</th>
                <th>Expires At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invitations?.map((invitation, index) => (
                <tr key={invitation.id}>
                  <td>{index + 1}</td>
                  <td>{invitation.fullName}</td>
                  <td>{invitation.email}</td>
                  <td>
                    {dayjs(invitation.createdAt.toDate()).format(
                      'DD MMMM, YYYY HH:mm:ss'
                    )}
                  </td>
                  <td>
                    {dayjs(invitation.expiresAt.toDate()).format(
                      'DD MMMM, YYYY HH:mm:ss'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-circle text-2xl"
                      onClick={() => {
                        const toastId = toast.loading(
                          `Deleting ${invitation.fullName} invitation`
                        )
                        startDeleteInvitationTransition(async () => {
                          const { message } = await deleteUserInvitation(
                            invitation.id
                          )

                          toast.success(message, {
                            id: toastId,
                          })
                        })
                      }}
                      disabled={isDeleteInvitationPending}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
