import {
  ArrowCircleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ConfirmModal from '../../components/ConfirmModal'
import axiosApiInstance from '../../utils/axiosConfig'
import Logout from '../../utils/Logout'
export default function Profile() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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
  const handleDelete = async () => {
    try {
      setLoading(true)
      let del_resp = await axiosApiInstance.delete(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profile`
      )
      setLoading(false)
      Logout()
      router.push('/')
    } catch (e) {
      setLoading(false)
    }
  }
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
      <div className="h-screen bg-red-100">
        <div className="flex w-full flex-row justify-between bg-gray-700 p-3">
          <div
            className="my-auto"
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            <ArrowCircleLeftIcon className="rounded-ful h-10 w-10 cursor-pointer text-red-500 hover:text-red-400" />
          </div>
          <div className=" flex w-fit rounded-full bg-gray-900 px-2 hover:cursor-pointer hover:bg-gray-800 sm:mx-0">
            <div className="h-10 w-10 rounded-full bg-red-50 p-2">
              <img
                src={`https://avatars.dicebear.com/api/human/${data.username}.svg`}
              />
            </div>
            <h2 className="my-auto ml-1 text-xl font-semibold text-red-400">
              Profile
            </h2>
          </div>
        </div>

        <div className=" my-24 mx-auto w-full rounded-lg bg-white p-5 shadow-lg md:w-11/12 xl:w-1/2">
          <div className="mx-auto h-28 w-28 rounded-full bg-red-100">
            <img
              src={`https://avatars.dicebear.com/api/human/${data.username}.svg`}
            />
          </div>
          <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
            <div className="my-auto w-1/4  ">Name:</div>
            <input
              value={data.username}
              disabled
              className="w-3/4 rounded-xl bg-red-200 p-2 text-center"
            />
          </div>
          <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
            <div className="my-auto w-1/4 ">Email : </div>
            <input
              value={data.email}
              disabled
              className="w-3/4 rounded-xl bg-red-200 p-2 text-center"
            />
          </div>
          <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
            <div className="my-auto w-1/4 ">Active : </div>
            {data.active ? (
              <CheckCircleIcon className="mx-auto  my-auto h-7 w-7 text-green-600" />
            ) : (
              <XCircleIcon className="mx-auto my-auto h-7 w-7 text-red-600" />
            )}
          </div>
          <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
            <div className="my-auto w-1/4 ">Stats : </div>
            {data.stats ? (
              <CheckCircleIcon className="mx-auto  my-auto h-7 w-7 text-green-600" />
            ) : (
              <XCircleIcon className="mx-auto my-auto h-7 w-7 text-red-600" />
            )}
          </div>
          <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
            <div className="my-auto w-1/4 ">Joined On : </div>
            <input
              disabled
              type="date"
              value={data.joined.split('T')[0]}
              className="my-auto w-3/4 rounded-xl bg-red-200 p-2 text-center"
            />
          </div>
          <ConfirmModal handleDelete={handleDelete} loading={loading} />
        </div>
      </div>
    </>
  )
}
