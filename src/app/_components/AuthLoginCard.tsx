'use client'

import React, { useEffect, useTransition } from 'react'
import { User } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/firebase/client'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-hot-toast'
import { FIREBASE_ERRORS } from '@/utils/constants'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  invitationId?: string
  onClickCreateAccount?: (invitationId: string) => void
  onUserLoggedIn?: (user: User) => void
}

export default function AuthLoginCard({
  className,
  invitationId,
  onClickCreateAccount,
  onUserLoggedIn,
  ...props
}: Props) {
  const [login, _user, _isLoadingLogin, loginError] =
    useSignInWithEmailAndPassword(firebaseAuth)
  const [isPendingTransition, startTransition] = useTransition()

  useEffect(() => {
    if (loginError) {
      toast.error(
        FIREBASE_ERRORS[loginError.code as keyof typeof FIREBASE_ERRORS]
      )
    }
  }, [loginError])

  return (
    <div
      className={twMerge(
        'w-[500px] max-w-[95vw] rounded-lg bg-white py-10 flex flex-col px-10 relative',
        className
      )}
      {...props}
    >
      <h1 className="font-lato uppercase font-bold text-primary text-2xl underline underline-offset-4 decoration-dashed">
        Recomm App
      </h1>
      <div className="w-full">
        <p className="font-lato font-bold my-5 text-lg">Sign Into Account</p>

        <form
          action={(formdata) => {
            const email = formdata.get('email') as string
            const password = formdata.get('password') as string

            startTransition(async () => {
              const userCredential = await login(email, password)
              if (userCredential) {
                onUserLoggedIn?.(userCredential!.user)
              }
            })
          }}
        >
          <div>
            <div className="form-control w-full">
              <label className="label font-lato" htmlFor="inputEmail">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="inputEmail"
                name="email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-lato" htmlFor="inputPassword">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="inputPassword"
                name="password"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary btn-block mt-6"
            disabled={isPendingTransition}
          >
            {isPendingTransition && (
              <span className="loading loading-spinner"></span>
            )}
            Sign In
          </button>
        </form>
        {invitationId && (
          <React.Fragment>
            <p className="mt-5 text-center font-lato text-sm">Or</p>

            <p className="text-center">
              <button
                className="btn btn-link no-underline"
                onClick={() => onClickCreateAccount?.(invitationId)}
              >
                Create a new account
              </button>
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
