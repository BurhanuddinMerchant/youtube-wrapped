import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import loginSVG from '../../assets/images/login.svg'
import { HomeIcon } from '@heroicons/react/solid'
import { Fade } from 'react-reveal'
import NavBar from '../../components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const errorToast = () => toast.error('An error occured')
  const router = useRouter()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    if (
      sessionStorage.getItem('token') &&
      sessionStorage.getItem('token') !== undefined
    ) {
      router.push('/dashboard')
    }
  }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(formData)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/login`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result)
        if (result.token) {
          sessionStorage.setItem('token', result.token)
          setFormData(() => ({ ...formData, username: '', password: '' }))
          router.push('/dashboard')
        } else {
          throw result
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        errorToast()
        setFormData({ ...formData, username: '', password: '' })
      })
  }
  return (
    <>
      <Head>
        <title>Login | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-red-100">
        <NavBar active={{ explore: true }} />
        <div className="mx-auto my-auto flex h-fit w-full flex-col-reverse justify-between rounded-lg bg-none p-10 sm:w-1/2 sm:flex-row sm:bg-white">
          <Fade left cascade>
            <div className=" mx-auto my-auto h-fit w-fit rounded-md bg-white p-10  shadow-lg sm:bg-slate-200">
              <div className=" mb-2 flex justify-between">
                <h2 className="ml-1 cursor-pointer text-xl font-semibold text-red-400">
                  Login
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
                  onChange={handleChange}
                  value={formData.username}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className="m-auto w-fit rounded-md border-2 border-gray-300 p-1 hover:border-red-300 focus:border-red-400"
                  name="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                <p className="mx-auto my-2 text-sm">
                  Dont have an account yet?
                  <Link href="/signup" className="cursor-pointer text-red-400">
                    <section className="inline cursor-pointer font-medium text-red-500">
                      Register Here
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
                    className="hover:text-black-600 mx-auto my-2 w-fit cursor-pointer rounded-md border-2 border-red-600 bg-red-600 px-2 py-1 text-white hover:bg-white hover:text-red-600  "
                  >
                    Login
                  </button>
                )}
              </form>
            </div>
          </Fade>
          <Fade right>
            <div className="my-auto ml-10 hidden w-full sm:block sm:w-96">
              <img src={loginSVG.src} className="w-full" />
            </div>
          </Fade>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
