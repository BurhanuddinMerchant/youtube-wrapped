import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StatsSection } from './Stats'
import { Unwrapped } from './UnWrapped'

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
        <title>DashBoard Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-row justify-between bg-gray-700 p-3">
        <div className=" text-center">
          <h2 className=" mx-auto cursor-pointer text-xl font-semibold text-red-400">
            Welcome Example User!
          </h2>
        </div>
        <button
          className=" my-auto w-fit cursor-pointer  rounded-md bg-white px-2 py-1 hover:bg-red-600 hover:text-red-100"
          onClick={handleSignOut}
        >
          <Link href="/login">SignOut</Link>{' '}
        </button>
      </div>
      {statsAvailable ? <StatsSection stats={userStats} /> : <Unwrapped />}
    </>
  )
}
