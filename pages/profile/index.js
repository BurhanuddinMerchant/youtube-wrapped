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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Profile() {
  const errorToast = (message) => toast.error(message)
  const successToast = (message) => toast.success(message)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [data, setData] = useState({
    username: '',
    email: '',
    active: '',
    stats: '',
    joined: '',
    avatar: 'human',
  })
  const [avatar, setAvatar] = useState('human')
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
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
  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosApiInstance({
        url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/password/reset`,
        method: 'post',
        data: JSON.stringify(formData),
      })
      setFormData({
        ...setFormData,
        old_password: '',
        new_password: '',
      })
      setLoading(false)
      successToast('Password Reset Successful')
    } catch (e) {
      setFormData({
        ...setFormData,
        old_password: '',
        new_password: '',
      })
      setLoading(false)
      errorToast('Wrong Old Passwrod')
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleAvatarChange = async (e) => {
    setData({ ...data, avatar: e.target.value })
    const resp = axiosApiInstance({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/avatar`,
      data: { avatar: e.target.value },
    })
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
                src={`https://avatars.dicebear.com/api/${data.avatar}/${data.username}.svg`}
              />
            </div>
            <h2 className="my-auto ml-1 text-xl font-semibold text-red-400">
              Profile
            </h2>
          </div>
        </div>

        {resetPassword ? (
          <form
            onSubmit={handlePasswordReset}
            className=" my-24 mx-auto w-full rounded-lg bg-white p-5 shadow-lg md:w-11/12 xl:w-1/2"
          >
            <div className="mx-auto h-28 w-28 rounded-full bg-red-100">
              <img
                src={`https://avatars.dicebear.com/api/${data.avatar}/${data.username}.svg`}
              />
            </div>
            <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
              <div className="my-auto w-1/4 ">Old Password : </div>
              <input
                type="password"
                value={formData.old_password}
                name="old_password"
                placeholder="Old Password"
                required
                onChange={handleChange}
                disabled={loading}
                className="my-auto w-3/4 rounded-xl bg-red-200 p-2 text-center"
              />
            </div>
            <div className="mx-auto mt-2 flex w-full justify-between rounded-xl bg-red-50 p-2 shadow-sm md:w-2/3">
              <div className="my-auto w-1/4 ">New Password : </div>
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                required
                disabled={loading}
                onChange={handleChange}
                value={formData.new_password}
                minLength={6}
                className="my-auto w-3/4 rounded-xl bg-red-200 p-2 text-center"
              />
            </div>
            <div className="w-full text-center">
              <button
                type="submit"
                className={`mx-auto mt-2 w-fit rounded-md  border-2 border-white bg-red-600 px-2 py-1 text-white hover:border-red-600 hover:bg-white hover:text-red-600 hover:shadow-lg ${
                  loading ? 'animate-bounce' : ''
                }`}
              >
                {loading ? 'Loading...' : 'Reset'}
              </button>
            </div>
            <div className="mt-2 w-full text-center">
              <button
                onClick={() => {
                  setResetPassword(false)
                  setFormData({
                    ...setFormData,
                    old_password: '',
                    new_password: '',
                  })
                }}
                className="mx-auto cursor-pointer text-red-500 underline hover:text-red-600"
              >
                Profile
              </button>
            </div>
          </form>
        ) : (
          <div className=" my-24 mx-auto w-full rounded-lg bg-white p-5 shadow-lg md:w-11/12 xl:w-1/2">
            <div className="mx-auto h-28 w-28 rounded-full bg-red-100">
              <img
                src={`https://avatars.dicebear.com/api/${data.avatar}/${data.username}.svg`}
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
              <div className="my-auto w-1/4 ">Avatar : </div>
              <select
                className="mx-auto w-3/4 rounded-xl bg-red-200 p-2 text-center text-lg"
                value={data.avatar}
                onChange={handleAvatarChange}
              >
                <option value="human" className=" cursor-pointer text-center">
                  Human
                </option>
                <option value="male" className=" cursor-pointer text-center">
                  Male
                </option>
                <option value="female" className=" cursor-pointer text-center">
                  Female
                </option>
              </select>
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
            <div className="w-full text-center">
              <button
                onClick={() => setResetPassword(true)}
                className="mx-auto cursor-pointer text-red-500 underline hover:text-red-600"
              >
                Reset Password?
              </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  )
}
