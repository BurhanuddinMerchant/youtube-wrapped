import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useGoogle from '../../hooks/useGoogle'
import youtubeSVG from '../../assets/images/youtube.svg'
export default function Authorize() {
  const router = useRouter()
  useGoogle()
  useEffect(() => {
    if (sessionStorage.getItem('access') === undefined) {
      router.push('/')
    }
  })

  return (
    <>
      <div className="flex h-screen animate-pulse flex-col  justify-center bg-red-100">
        <Image src={youtubeSVG} className="mx-auto w-1/2" />
        <div className="mx-auto p-5 text-center text-sm font-medium">
          <div>
            Please Tick The <b>YouTube</b> Access scope This Time
          </div>
          <div>
            You have been redirected here as you forgot to provide the{' '}
            <b>right access</b> or you <b>closed</b> the popup
          </div>
          <div>Make Sure Popups are enabled in your browser</div>
        </div>
      </div>
    </>
  )
}
