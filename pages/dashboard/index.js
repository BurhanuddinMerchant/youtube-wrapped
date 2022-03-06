import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DashNav from '../../components/DashNav.js'
import Loading from '../../components/Loading.js'
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
                  `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/test/stats`,
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
      <DashNav username={username} />
      {loading ? (
        <>
          <Loading />
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
