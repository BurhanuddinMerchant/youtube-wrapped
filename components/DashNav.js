import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logout from '../utils/Logout'
export default function DashNav(props) {
  const { username, avatar } = props
  const handleSignOut = () => {
    Logout()
    router.push('/')
  }
  const router = useRouter()
  return (
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
        <HomeIcon
          className="my-auto mr-2 h-8 w-8 cursor-pointer text-red-400 hover:text-white sm:my-auto"
          onClick={() => router.push('/')}
        />
        <button
          className="mx-auto  w-fit cursor-pointer rounded-md bg-red-400  px-2 py-1 text-red-100 hover:bg-white hover:text-black sm:mx-0 sm:my-auto"
          onClick={handleSignOut}
        >
          <Link href="/login">SignOut</Link>
        </button>
      </div>
    </div>
  )
}
