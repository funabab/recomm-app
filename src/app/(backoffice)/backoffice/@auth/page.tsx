'use client'
import { firebaseAuth } from '@/firebase/client'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'

export default function AuthPage() {
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth)
  return (
    <main className="w-screen h-screen bg-neutral text-neutral-content flex justify-center items-center relative">
      <svg
        id="patternId"
        className="absolute w-full h-full inset-0"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="40"
            height="59.428"
            patternTransform="scale(2) rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0,0%,100%,0)"
            />
            <path
              d="M0 70.975V47.881m20-1.692L8.535 52.808v13.239L20 72.667l11.465-6.62V52.808zm0-32.95l11.465-6.62V-6.619L20-13.24 8.535-6.619V6.619L20 13.24m8.535 4.927v13.238L40 38.024l11.465-6.62V18.166L40 11.546zM20 36.333L0 47.88m0 0v23.094m0 0l20 11.548 20-11.548V47.88m0 0L20 36.333m0 0l20 11.549M0 11.547l-11.465 6.619v13.239L0 38.025l11.465-6.62v-13.24L0 11.548v-23.094l20-11.547 20 11.547v23.094M20 36.333V13.24"
              strokeLinecap="square"
              strokeWidth="1"
              stroke="hsla(88, 50%, 53%, 0.23)"
              fill="none"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
      <div className="w-[500px] max-w-[95vw] bg-base-100 rounded-lg py-10 flex flex-col px-10 relative">
        <h1 className="font-lato uppercase font-bold text-primary text-2xl underline underline-offset-4 decoration-dashed">
          Recomm App Backoffice
        </h1>
        <div className="w-full">
          <p className="font-lato font-bold my-5 text-neutral text-lg">
            Login To Backoffice
          </p>
          <p className="text-center">
            <button
              className="btn btn-ghost btn-block text-neutral"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
