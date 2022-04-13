import { ArrowCircleRightIcon, ExclamationIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { getAccessToken } from '../utils/Auth'
import axiosApiInstance from '../utils/axiosConfig'

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const resendVerificationMail = async () => {
    setLoading(true)
    try {
      let response = await axiosApiInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/email/resend`
      )
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <div className="mx-5 mt-10 w-fit bg-red-50 p-10 text-center shadow-lg sm:mx-auto">
      <div className="mx-auto mb-2 flex w-fit">
        <p className="my-auto w-fit text-center text-xl font-bold text-red-500">
          Caution
        </p>
        <ExclamationIcon className="h-7 w-7 text-red-500" />
      </div>
      A verification email has been sent to your email address (check your spam
      too) , please verify your email and reload this window. Just in case if
      the link has expired , click below to resend the verification link
      <button
        onClick={resendVerificationMail}
        className={`mx-auto my-2 block w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600 hover:text-red-100 hover:shadow-sm hover:shadow-red-300 ${
          loading ? 'animate-bounce' : ''
        }`}
      >
        {loading ? 'Loading...' : 'Resend Mail'}
      </button>
      <a
        href="https://privacy-policy.youtubewrapped.ml/"
        className="mx-auto flex w-fit cursor-pointer hover:text-gray-400"
        target="_blank"
        rel="noreferrer"
      >
        <p className="mx-auto my-auto mr-1 w-fit ">Privacy Policy</p>
        <ArrowCircleRightIcon className="my-auto mx-auto h-5 w-5" />
      </a>
    </div>
  )
}
