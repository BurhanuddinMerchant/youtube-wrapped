import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import loginSVG from '../../assets/images/login.svg'
import { HomeIcon } from '@heroicons/react/solid'
import { Fade } from 'react-reveal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../../components/Navbar'
import axios from 'axios'

export default function SignUp() {
  const errorToast = (message) => toast.error(message)
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    if (
      sessionStorage.getItem('access') &&
      sessionStorage.getItem('access') !== undefined
    ) {
      router.push('/dashboard')
    }
  }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      var data = JSON.stringify(formData)

      var config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }
      let response = await axios(config)
      response = response.data
      setFormData(() => ({ ...formData, username: '', password: '' }))
      sessionStorage.setItem('refresh', response.data.token.refresh)
      sessionStorage.setItem('access', response.data.token.access)
      router.push('/dashboard')
      setLoading(false)
    } catch (e) {
      setLoading(false)
      errorToast('Username/Email Already in use')
      setFormData({ username: '', password: '', email: '' })
    }
  }
  return (
    <>
      <Head>
        <title>SignUp | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-red-100 ">
        <NavBar active={{ explore: true }} />
        <div className="mx-auto my-auto flex h-fit w-full flex-col-reverse justify-between rounded-lg bg-none p-10 sm:w-1/2 sm:flex-row sm:bg-white">
          <Fade right>
            <div className="my-auto mr-10 hidden w-full sm:block sm:w-96">
              <img src={loginSVG.src} alt="signup" className="w-full" />
            </div>
          </Fade>
          <Fade left cascade>
            <div className=" mx-auto my-auto h-fit w-fit rounded-md bg-white p-10  shadow-lg sm:bg-slate-200">
              <div className=" mb-2 flex justify-between">
                <h2 className="ml-1 cursor-pointer text-xl font-semibold text-red-400">
                  SignUp
                </h2>
                <HomeIcon
                  className="my-auto mr-1 h-7 w-7 cursor-pointer text-red-400 hover:text-red-500"
                  onClick={() => router.push('/')}
                />
              </div>
              <form className=" flex flex-col " onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="m-auto my-1 w-fit rounded-sm border-2 border-gray-300 p-1 hover:border-red-300 focus:border-red-400"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="m-auto my-1 w-fit rounded-sm border-2 border-gray-300 p-1 hover:border-red-300 focus:border-red-400"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className="m-auto w-fit rounded-md border-2 border-gray-300 p-1 hover:border-red-300 focus:border-red-400"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="mx-auto my-2 text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="cursor-pointer text-red-400">
                    <section className="inline cursor-pointer font-medium text-red-500">
                      Login Here
                    </section>
                  </Link>
                </p>
                {isLoading ? (
                  <p className=" mx-auto my-2 w-fit animate-bounce cursor-pointer rounded-md  bg-red-600 px-2 py-1 text-red-100">
                    Loading...
                  </p>
                ) : (
                  <button
                    type="submit"
                    className=" hover:text-black-600 mx-auto my-2 w-fit cursor-pointer rounded-md border-2 border-red-600 bg-red-600 px-2 py-1 text-white hover:bg-white hover:text-red-600 "
                  >
                    SignUp
                  </button>
                )}
              </form>
            </div>
          </Fade>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
