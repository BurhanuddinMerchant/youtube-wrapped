import { ArrowCircleLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axiosApiInstance from '../../utils/axiosConfig'

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState({
    username: '',
    email: '',
    active: '',
    stats: '',
    joined: '',
  })
  useEffect(() => {
    if (!sessionStorage.getItem('access')) {
      router.push('/')
    }
  })
  useEffect(async () => {
    try {
      let profile = await axiosApiInstance.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profile`
      )
      profile = profile.data.user
      setData({
        ...data,
        username: profile.username,
        email: profile.email,
        active: profile.is_active,
        stats: profile.are_stats_generated,
        joined: profile.date_joined,
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Profile | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex w-full flex-col  justify-between bg-gray-700 p-3 sm:flex-row">
        <div
          className="my-auto"
          onClick={() => {
            router.push('/dashboard')
          }}
        >
          <ArrowCircleLeftIcon className="rounded-ful h-10 w-10 cursor-pointer text-red-500 hover:text-red-400" />
        </div>
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-red-50 p-2">
            <img src="https://avatars.dicebear.com/api/human/love.svg" />
          </div>
          <h2 className="my-auto ml-1 cursor-default text-xl font-semibold text-red-400">
            Profile
          </h2>
        </div>
      </div>
      <div className="h-screen bg-red-100">
        <div className="mx-auto w-full bg-red-100 pt-10  md:w-1/2">
          <div className="mx-auto w-full rounded-lg bg-white p-5 shadow-lg">
            <div className="mx-auto h-28 w-28 rounded-full bg-white">
              <img src="https://avatars.dicebear.com/api/human/love.svg" />
            </div>
            <div className="mx-auto flex w-1/3 justify-between">
              <div className="my-auto">Name:</div>
              <input
                value={data.username}
                disabled
                className="mt-2 bg-red-200 p-1"
              />
            </div>
            <div className="mx-auto mt-2 flex w-1/3 justify-between">
              <div className="my-auto">Email : </div>
              <input
                value={data.email}
                disabled
                className="mt-2 bg-red-200 p-1"
              />
            </div>
            <div className="mx-auto mt-2 flex w-1/3 justify-between">
              <div className="my-auto">Active : </div>
              <input
                disabled
                type="checkbox"
                checked={data.active}
                className="my-auto bg-red-200 p-1"
              />
            </div>
            <div className="mx-auto mt-2 flex w-1/3 justify-between">
              <div className="my-auto">Stats : </div>
              <input
                disabled
                type="checkbox"
                checked={data.stats}
                className="my-auto p-1"
              />
            </div>
            <div className="mx-auto mt-2 flex w-1/3 justify-between">
              <div className="my-auto">Joined On : </div>
              <input
                disabled
                type="date"
                value={data.joined.split('T')[0]}
                className="my-auto bg-red-200 p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
