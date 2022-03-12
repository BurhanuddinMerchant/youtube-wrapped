import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DashNav from '../../components/DashNav.js'
import Loading from '../../components/Loading.js'
import StatsSection from '../../components/Stats.js'
import Unwrapped from '../../components/UnWrapped.js'
import VerifyEmail from '../../components/VerifyEmail.js'
import axiosApiInstance from '../../utils/axiosConfig.js'
export default function DashBoard() {
  const router = useRouter()
  const [statsAvailable, setStatsAvailable] = useState(false)
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [userStats, setUserStats] = useState(null)
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(async () => {
    setLoading(true)
    if (!sessionStorage.getItem('access')) {
      router.push('/')
    } else {
      try {
        let response = await axiosApiInstance.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profile`
        )
        setUsername(response.data.data.username)
      } catch (e) {
        // console.log(e)
      }
      let user_stats = localStorage.getItem('userStats')
      if (user_stats && JSON.parse(user_stats).username === username) {
        setUserStats(JSON.parse(user_stats))
        setStatsAvailable(true)
        setLoading(false)
      } else {
        try {
          let check_response = await axiosApiInstance.get(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/check`
          )
          setStatsAvailable(check_response.data.data.stats_status)
          setIsActiveUser(check_response.data.data.is_active)
          if (check_response.data.data.stats_status === true) {
            try {
              let stats_response = await axiosApiInstance.get(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/stats`
              )
              setUserStats(stats_response.data.data)
              localStorage.setItem(
                'userStats',
                JSON.stringify(stats_response.data.data)
              )
              setLoading(false)
            } catch (e) {
              setLoading(false)
            }
          } else {
            setLoading(false)
          }
        } catch (e) {
          setLoading(false)
        }
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
            <>
              {!isActiveUser ? (
                <VerifyEmail />
              ) : (
                <Unwrapped setStatsAvailable={setStatsAvailable} />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
