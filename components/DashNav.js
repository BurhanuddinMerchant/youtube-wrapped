import { HomeIcon, ShareIcon, LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import * as htmlToImage from 'html-to-image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Logout from '../utils/Logout'
import Share from '../pages/share'
export default function DashNav(props) {
  const { username, avatar, data } = props
  const handleSignOut = () => {
    Logout()
    router.push('/')
  }
  const [show, setShow] = useState(false)
  const printWrap = () => {
    setShow(true)
    setTimeout(
      () =>
        htmlToImage
          .toPng(document.getElementById('body'), {
            width: 1080,
            height: 1920,
            canvasWidth: 1080,
            canvasHeight: 1920,
          })
          .then(function (dataUrl) {
            var a = document.createElement('a')
            a.href = dataUrl
            a.download = 'wrapd.png'
            a.click()
          }),
      1000
    )
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }

  const router = useRouter()
  return (
    <>
      <Share data={data} show={show} />
      <div className="my-auto flex w-full flex-row justify-between bg-gray-700 p-3">
        <div
          className=" flex w-fit cursor-pointer rounded-full bg-gray-900 px-2 hover:bg-gray-800 "
          onClick={() => router.push('/profile')}
        >
          <div className="h-10 w-10 rounded-full bg-white p-2">
            <img
              src={`https://avatars.dicebear.com/api/${avatar}/${username}.svg`}
            />
          </div>
          <h2 className="my-auto ml-1 text-xl font-semibold text-red-400">
            {username}
          </h2>
        </div>

        <div className="my-auto flex w-fit">
          <ShareIcon
            className="sm:my-auto0 my-auto mr-2 h-8 w-8 cursor-pointer text-red-400 hover:text-white "
            onClick={printWrap}
          />
          <HomeIcon
            className="my-auto mr-2 h-8 w-8 cursor-pointer text-red-400 hover:text-white sm:my-auto"
            onClick={() => router.push('/')}
          />
          <button
            className="mx-auto  hidden w-fit cursor-pointer rounded-md  bg-red-400 px-2 py-1 text-red-100 hover:bg-white hover:text-black sm:mx-0 sm:my-auto sm:block"
            onClick={handleSignOut}
          >
            <Link href="/login">SignOut</Link>
          </button>
          <LogoutIcon
            className="my-auto h-8 w-8 cursor-pointer text-red-400 hover:text-white sm:my-auto sm:hidden"
            onClick={handleSignOut}
          >
            <Link href="/login">SignOut</Link>
          </LogoutIcon>
        </div>
      </div>
    </>
  )
}
