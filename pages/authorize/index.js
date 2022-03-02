import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useGoogle from '../../hooks/useGoogle'
import youtubeSVG from '../../assets/images/youtube.svg'
export default function Authorize() {
  const router = useRouter()
  useGoogle()
  useEffect(() => {
    if (sessionStorage.getItem('token') === undefined) {
      router.push('/')
    }
  })

  return (
    <>
      <div className="flex h-screen animate-pulse flex-col  justify-center bg-red-100">
        <Image src={youtubeSVG} className="mx-auto w-1/2" />
        <p className="text-center font-medium">
          Please Authorize the app (Enable Popups!)
        </p>
      </div>
    </>
  )
}
