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
import axios from 'axios'
import { loadScript } from '../../utils/loadScript'

export default function Login() {
  const errorToast = (message) => toast.error(message)
  const router = useRouter()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [isLoading, setLoading] = useState(false)
  useEffect(async () => {
    const res = await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']}`
    )
    if (!res) {
      errorToast('Loading Recaptcha Failed')
    }
  }, [])
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
  const Validate = (callback, error) => {
    try {
      window.grecaptcha.ready(async function () {
        const token = await window.grecaptcha.execute(
          process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY'],
          {
            action: 'submit',
          }
        )
        const verified = await fetch(
          `${process.env['NEXT_PUBLIC_SERVER_BASE_URL']}/api/recaptcha?token=${token}`
        )
          .then((res) => res.json())
          .then((resp) => resp['verified'])
          .catch((e) => {
            throw 'An error Occured'
          })
        if (verified) {
          callback()
        } else {
          setFormData(() => ({ ...formData, username: '', password: '' }))
          error()
        }
      })
    } catch (err) {
      error()
    }
  }
  const handleSubmit = async () => {
    // setLoading(true)
    // e.preventDefault()

    try {
      let data = JSON.stringify(formData)
      let config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }
      let response = await axios(config)
      setFormData(() => ({ ...formData, username: '', password: '' }))
      sessionStorage.setItem('refresh', response.data.refresh)
      sessionStorage.setItem('access', response.data.access)
      router.push('/dashboard')
      setLoading(false)
    } catch (e) {
      errorToast('Invalid Credentials')
      setFormData(() => ({ ...formData, username: '', password: '' }))
      setLoading(false)
    }
  }
  const handlePreSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    Validate(handleSubmit, () => {
      errorToast('Recaptcha Failed')
      setLoading(false)
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
              <form className=" flex flex-col " onSubmit={handlePreSubmit}>
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
                  Dont have an account yet?{' '}
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
              <img src={loginSVG.src} className="w-full" alt="login" />
            </div>
          </Fade>
        </div>
        <ToastContainer />
      </div>
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
