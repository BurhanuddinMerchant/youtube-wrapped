import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DashBoard() {
  const router = useRouter()
  const [statsAvailable, setStatsAvailable] = useState(false)
  const [userStats, setUserStats] = useState(null)
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      router.push('/')
    } else {
      var myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Bearer ${sessionStorage.getItem('token')}`
      )
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
      let user_stats = localStorage.getItem('userStats')
      if (user_stats) {
        setUserStats(JSON.parse(user_stats))
        setStatsAvailable(true)
      } else {
        fetch('http://localhost:8000/api/check', requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              setStatsAvailable(result.data.status)
              if (result.data.status === true) {
                fetch('http://localhost:8000/api/test/stats', requestOptions)
                  .then((response) => response.json())
                  .then((result) => {
                    setUserStats(result.data)
                    localStorage.setItem(
                      'userStats',
                      JSON.stringify(result.data)
                    )
                  })
                  .catch((error) => console.log('error', error))
              }
            } else {
              throw result
            }
          })
          .catch((error) => console.log('error', error))
      }
    }
  }, [])
  useEffect(() => {
    console.log(userStats), [setUserStats]
  })
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

          {statsAvailable ? (
            <div>Stats</div>
          ) : (
            <button
              className=" mx-auto my-2 w-fit cursor-pointer  rounded-md bg-white px-2 py-1 hover:bg-red-600 hover:text-red-100"
              onClick={handleSignOut}
            >
              UnWrap
            </button>
          )}
        </div>
      </div>
    </>
  )
}
