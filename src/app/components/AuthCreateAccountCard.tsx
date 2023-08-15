import React, { useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { firebaseAuth, firebaseFirestore } from '@/firebase/client'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FIREBASE_ERRORS } from '@/utils/constants'
import { FirebaseError } from '@firebase/util'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface Props {
  invitationId?: string
  onClickLoginAccount?: (invitationId: string) => void
  onUserLoggedIn?: (user: User) => void
}

export default function AuthCreateAccountCard({
  invitationId,
  onUserLoggedIn,
  onClickLoginAccount,
}: Props) {
  const [signup] = useCreateUserWithEmailAndPassword(firebaseAuth)
  const [isPendingTransition, startTransition] = useTransition()

  return (
    <div className="w-[500px] max-w-[95vw] rounded-lg bg-white py-10 flex flex-col px-10 relative">
      <h1 className="font-lato uppercase font-bold text-primary text-2xl underline underline-offset-4 decoration-dashed">
        Recomm App
      </h1>
      <div className="w-full">
        <p className="font-lato font-bold my-5 text-lg">Create a new Account</p>

        <form
          action={(formdata) => {
            const email = formdata.get('email') as string
            const password = formdata.get('password') as string
            const fullname = formdata.get('fullname') as string

            startTransition(async () => {
              try {
                const userCredential = await signup(email, password)
                await setDoc(
                  doc(firebaseFirestore, `users/${userCredential?.user.uid}`),
                  {
                    displayName: fullname,
                  },
                  {
                    merge: true,
                  }
                )

                toast.success('Account created successfully')
                onUserLoggedIn?.({
                  ...userCredential!.user,
                  displayName: fullname,
                })
              } catch (e) {
                const err = e as FirebaseError
                toast.error(
                  FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS]
                )
              }
            })
          }}
        >
          <div>
            <div className="form-control w-full">
              <label className="label font-lato" htmlFor="inputFullname">
                <span className="label-text">Fullname</span>
              </label>
              <input
                type="text"
                name="fullname"
                id="inputFullname"
                autoComplete="name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-lato" htmlFor="inputEmail">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="inputEmail"
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
                name="password"
                id="inputPassword"
                autoComplete="new-password"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary btn-block mt-6"
            type="submit"
            disabled={isPendingTransition}
          >
            {isPendingTransition && (
              <span className="loading loading-spinner"></span>
            )}
            Create Account
          </button>
        </form>
        {invitationId && (
          <React.Fragment>
            <p className="mt-5 text-center font-lato text-sm">Or</p>

            <p className="text-center">
              <button
                className="btn btn-link no-underline"
                onClick={() => onClickLoginAccount?.(invitationId)}
              >
                Log into existing account
              </button>
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
