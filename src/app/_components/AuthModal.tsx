'use client'

import { firebaseAuth } from '@/firebase/client'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as Dialog from '@radix-ui/react-dialog'
import AuthLoginCard from './AuthLoginCard'
import { useEffect, useState } from 'react'
import AuthCreateAccountCard from './AuthCreateAccountCard'
import { User } from 'firebase/auth'

interface Props extends Dialog.DialogProps {
  invitationId?: string
  onUserLoggedIn?: (user: User) => void
}

export default function AuthModal({
  invitationId,
  onUserLoggedIn,
  ...props
}: Props) {
  const [user] = useAuthState(firebaseAuth)
  const [showModal, setShowModal] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    setShowModal(Boolean(props.open))
  }, [props.open])

  useEffect(() => {
    if (user) {
      setShowModal(false)
    }
  }, [user])

  return (
    <Dialog.Root
      {...props}
      open={showModal}
      onOpenChange={(open) => {
        setShowModal(open)
        props.onOpenChange?.(open)
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]  focus:outline-none">
          {showLogin ? (
            <AuthLoginCard
              invitationId={invitationId}
              onClickCreateAccount={() => setShowLogin(false)}
              onUserLoggedIn={onUserLoggedIn}
            />
          ) : (
            <AuthCreateAccountCard
              invitationId={invitationId}
              onClickLoginAccount={() => setShowLogin(true)}
              onUserLoggedIn={onUserLoggedIn}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
