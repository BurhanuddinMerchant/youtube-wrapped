import { HomeIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StatsSection from '../../components/Stats.js'
import Unwrapped from '../../components/UnWrapped.js'
export default function DashBoard() {
  const errorToast = (message) => toast.error(message)
  const router = useRouter()
  const [statsAvailable, setStatsAvailable] = useState(false)
  const [userStats, setUserStats] = useState(null)
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (!sessionStorage.getItem('token')) {
      errorToast('Please Login!')
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
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profile`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setUsername(result.data.username)
        })
        .catch((e) => {
          errorToast('An Error Occured')
          // console.log(e)
        })
      let user_stats = localStorage.getItem('userStats')
      if (user_stats) {
        setUserStats(JSON.parse(user_stats))
        setStatsAvailable(true)
        setLoading(false)
      } else {
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/check`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              setStatsAvailable(result.data.status)
              if (result.data.status === true) {
                fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/stats`,
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    setUserStats(result.data)
                    localStorage.setItem(
                      'userStats',
                      JSON.stringify(result.data)
                    )
                    setLoading(false)
                  })
                  .catch((error) => {
                    // console.log('error', error)
                    errorToast('An Error Occured')
                    setLoading(false)
                  })
              } else {
                setLoading(false)
              }
            } else {
              setLoading(false)
              throw result
            }
          })
          .catch((error) => {
            setLoading(false)
            errorToast('An Error Occured')
            // console.log('error', error)
          })
      }
    }
  }, [statsAvailable])

  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('userStats')
    sessionStorage.removeItem('yt_access_token')
    router.push('/')
  }
  return (
    <>
      <Head>
        <title>Dashboard | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex w-full flex-col  justify-between bg-gray-700 p-3 sm:flex-row">
        <div className=" text-center">
          <h2 className=" mx-auto cursor-pointer text-xl font-semibold text-red-400">
            Welcome To Youtube Wrapped {username} !
          </h2>
        </div>
        <div className="mx-auto flex w-fit sm:mx-0">
          <HomeIcon
            className="my-auto mt-2 mr-2 h-8 w-8 cursor-pointer text-white hover:text-red-400 sm:my-auto"
            onClick={() => router.push('/')}
          />
          <button
            className="mx-auto  mt-2 w-fit cursor-pointer rounded-md bg-white  px-2 py-1 hover:bg-red-400 hover:text-red-100 sm:mx-0 sm:my-auto"
            onClick={handleSignOut}
          >
            <Link href="/login">SignOut</Link>
          </button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="mx-auto mt-16 w-fit">
            <div className=" animate-pulse">
              <div
                style={{ borderTopColor: 'transparent' }}
                className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-red-400"
              ></div>
              <p>Loading...</p>
            </div>
          </div>
        </>
      ) : (
        // <>
        <>
          {statsAvailable && userStats ? (
            <StatsSection stats={userStats} />
          ) : (
            <Unwrapped setStatsAvailable={setStatsAvailable} />
          )}
        </>
      )}
    </>
  )
}
