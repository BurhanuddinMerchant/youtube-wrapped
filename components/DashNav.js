import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function DashNav(props) {
  const { username } = props
  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('userStats')
    sessionStorage.removeItem('yt_access_token')
    router.push('/')
  }
  const router = useRouter()
  return (
    <div className="flex w-full flex-col  justify-between bg-gray-700 p-3 sm:flex-row">
      <div className=" text-center">
        <h2 className=" mx-auto cursor-default text-xl font-semibold text-red-400">
          Welcome To Youtube Wrapped {username} !
        </h2>
      </div>
      <div className="mx-auto flex w-fit sm:mx-0">
        <HomeIcon
          className="my-auto mt-2 mr-2 h-8 w-8 cursor-pointer text-red-400 hover:text-white sm:my-auto"
          onClick={() => router.push('/')}
        />
        <button
          className="mx-auto  mt-2 w-fit cursor-pointer rounded-md bg-red-400  px-2 py-1 text-red-100 hover:bg-white hover:text-black sm:mx-0 sm:my-auto"
          onClick={handleSignOut}
        >
          <Link href="/login">SignOut</Link>
        </button>
      </div>
    </div>
  )
}
