import { ArrowCircleRightIcon, ExclamationIcon } from '@heroicons/react/solid'

export default function VerifyEmail() {
  return (
    <div className="mx-5 mt-10 w-fit bg-red-50 p-10 text-center shadow-lg sm:mx-auto">
      <div className="mx-auto mb-2 flex w-fit">
        <p className="my-auto w-fit text-center text-xl font-bold text-red-500">
          Caution
        </p>
        <ExclamationIcon className="h-7 w-7 text-red-500" />
      </div>
      A verification email has been sent to your email address , please verify
      your email and reload this window
      <a
        href="https://privacy-policy.youtubewrapped.ml/"
        className="mx-auto flex w-fit cursor-pointer hover:text-gray-400"
        target="_blank"
        rel="noreferrer"
      >
        <p className="mx-auto my-auto mr-1 w-fit ">Privacy Plicy</p>
        <ArrowCircleRightIcon className="my-auto mx-auto h-5 w-5" />
      </a>
    </div>
  )
}
