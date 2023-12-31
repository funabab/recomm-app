'use client'

import { acceptDepartmentInvitation } from '@/app/_actions/department'
import AuthModal from '@/app/_components/AuthModal'
import { firebaseAuth } from '@/firebase/client'
import { Department, Invitation } from '@/typings'
import { USER_ROLES } from '@/utils/constants'
import { User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-hot-toast'

interface Props {
  department: Department
  invitation: Invitation
}

export default function UserInvitationCard({ department, invitation }: Props) {
  const [user, isLoadingAuthState] = useAuthState(firebaseAuth)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [invitationState, setInvitationState] = useState<
    'unaccepted' | 'processing' | 'accepted'
  >('unaccepted')
  const router = useRouter()

  const handleUserLoggedIn = useCallback(
    async (authUser: User) => {
      setInvitationState('processing')
      const token = await authUser.getIdToken()
      const toastId = toast.loading('Accepting invitation...')

      try {
        const { message } = await acceptDepartmentInvitation(
          {
            id: invitation.id,
            displayName: authUser.displayName,
            email: authUser.email,
          },
          token
        )

        toast.success(message, { id: toastId })
        setInvitationState('accepted')
        router.replace('/chat')
      } catch (e) {
        const err = e as Error
        toast.error(err.message || "Something wen't wrong", { id: toastId })
        setInvitationState('unaccepted')
      }
    },
    [invitation.id, router]
  )

  const handleAcceptInvitation = useCallback(() => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      handleUserLoggedIn(user)
    }
  }, [handleUserLoggedIn, user])

  return (
    <div className="w-96 max-w-[95vw] rounded-lg bg-base-300 py-10 flex flex-col items-center px-10 relative">
      <div className="avatar placeholder">
        <div className="w-24 rounded bg-neutral">
          <span className="font-lato font-bold text-xl text-neutral-content">
            {department.title[0]}
          </span>
        </div>
      </div>
      <p className="mt-5 text-center font-lato font-medium">
        You&apos;ve been invited to join {department.title} department as{' '}
        {USER_ROLES[invitation.role]}
      </p>
      <p className="mt-5 text-xl font-lato font-bold text-center">
        {department.description}
      </p>
      <div className="mt-6 w-full">
        <button
          className="btn btn-primary btn-block"
          disabled={isLoadingAuthState || invitationState !== 'unaccepted'}
          onClick={handleAcceptInvitation}
        >
          {(isLoadingAuthState || invitationState === 'processing') && (
            <span className="loading loading-spinner"></span>
          )}
          Accept Invitation
        </button>
      </div>

      <AuthModal
        invitationId={invitation.id}
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onUserLoggedIn={handleUserLoggedIn}
      />
    </div>
  )
}
