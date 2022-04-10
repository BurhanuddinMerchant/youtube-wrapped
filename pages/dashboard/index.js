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
  const [user, setUser] = useState({ username: '', avatar: 'human' })
  const [loading, setLoading] = useState(false)
  const [sharableData, setSharableData] = useState({
    username: '',
    most_viewed_topic: '',
    most_viewed_tag: '',
    most_viewed_channel: '',
    top_channels: ['', '', ''],
    top_tags: ['', '', ''],
    top_topics: ['', '', ''],
  })
  console.log(user.username)
  useEffect(async () => {
    setLoading(true)
    if (!sessionStorage.getItem('access')) {
      router.push('/')
    } else {
      try {
        let response = await axiosApiInstance.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profile/name`
        )
        setUser({
          ...user,
          username: response.data.data.username,
          avatar: response.data.data.avatar,
        })
      } catch (e) {
        // console.log(e)
      }
      let user_stats = localStorage.getItem('userStats')
      if (user_stats) {
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
      <DashNav
        username={user.username}
        avatar={user.avatar}
        data={sharableData}
      />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        // <>
        <>
          {statsAvailable && userStats ? (
            <StatsSection
              stats={userStats}
              setSharableData={setSharableData}
              user={user}
            />
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
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="burhanuddin"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank You For Visiting and Supporting me!"
        data-color="#FF5F5F"
        data-bg="#ff0000"
        data-position="left"
        data-x_margin="20"
        data-y_margin="20"
        async={true}
      ></script>
    </>
  )
}
