import React from 'react'
import { User } from 'firebase/auth'

interface Props {
  invitationId?: string
  onClickCreateAccount?: (invitationId: string) => void
  onUserLoggedIn?: (user: User) => void
}

export default function AuthLoginCard({
  invitationId,
  onClickCreateAccount,
  onUserLoggedIn,
}: Props) {
  return (
    <div className="w-[500px] max-w-[95vw] rounded-lg bg-white py-10 flex flex-col px-10 relative">
      <h1 className="font-lato uppercase font-bold text-primary text-2xl underline underline-offset-4 decoration-dashed">
        Recomm App
      </h1>
      <div className="w-full">
        <p className="font-lato font-bold my-5 text-lg">Sign Into Account</p>

        <div>
          <div className="form-control w-full">
            <label className="label font-lato" htmlFor="inputEmail">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="inputEmail"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-lato" htmlFor="inputPassword">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="inputPassword"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button className="btn btn-primary btn-block mt-6">Sign In</button>
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
