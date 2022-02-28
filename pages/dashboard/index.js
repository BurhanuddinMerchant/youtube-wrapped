import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function DashBoard() {
  const router = useRouter()

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/')
    }
  }, [])
  const handleSignOut = () => {
    sessionStorage.removeItem('token')
  }
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" container my-40 mx-auto flex w-1/3 flex-row bg-gray-200 p-10 hover:bg-red-100">
        <div className="mx-auto">
          <div className=" text-center">
            <h2 className=" mx-auto cursor-pointer text-xl font-semibold text-red-400">
              DashBoard
            </h2>
          </div>
          <Link href="/login">
            <button
              className=" mx-auto my-2 w-fit cursor-pointer  rounded-md bg-white px-2 py-1 hover:bg-red-600 hover:text-red-100"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
