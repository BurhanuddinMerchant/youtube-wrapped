import Head from 'next/head'
import { Fade, Zoom } from 'react-reveal'
import { useState } from 'react'
import NavBar from '../../components/Navbar'
import contactSVG from '../../assets/images/contact.svg'
export default function Contact() {
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    message: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(formState)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/email`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setFormState({
          email: '',
          name: '',
          message: '',
        })
        console.log(result)
      })
      .catch((error) => {
        setFormState({
          email: '',
          name: '',
          message: '',
        })
        console.log('error', error)
      })
  }
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Head>
        <title>Contact | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="box-border h-screen w-full bg-red-100">
        <NavBar active={{ contact: true }} />

        <Zoom>
          <div className="mx-auto mt-10 w-full rounded-lg bg-white p-10 shadow-md sm:w-2/3">
            <Fade left>
              <div className="mx-auto w-fit  text-3xl font-medium text-red-700 sm:text-4xl">
                Contact
              </div>
              <div className="mx-auto mt-2 w-fit text-lg font-medium text-gray-500">
                I Would Love To Hear From You !
              </div>
            </Fade>
            <div className="mx-auto my-auto flex h-fit w-fit flex-col-reverse rounded-lg  bg-none sm:flex-row sm:bg-white xl:p-10">
              <div className="my-auto mx-0 hidden w-full sm:mr-10  sm:w-96 xl:block">
                <img src={contactSVG.src} className="w-full" />
              </div>
              <Fade left>
                <div className="mx-auto mt-10 text-center text-lg">
                  <form
                    className="mx-auto flex w-fit flex-col text-xl"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      className="rounded-lg border-2 border-red-500 bg-red-200 p-2 placeholder-slate-500 sm:border-white sm:hover:border-red-500 "
                      placeholder="Enter your email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      name="email"
                    />
                    <input
                      type="text"
                      className="mt-2 rounded-lg border-2 border-red-500 bg-red-200 p-2 placeholder-slate-500  sm:border-white sm:hover:border-red-500"
                      placeholder="Enter Your Full Name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      name="name"
                    />
                    <textarea
                      placeholder="Message"
                      className=" mt-2 h-32 rounded-lg border-2 border-red-500 bg-red-200 p-2 placeholder-slate-500  sm:border-white sm:hover:border-red-500"
                      value={formState.message}
                      onChange={handleChange}
                      name="message"
                      required
                    />
                    <button
                      type="submit"
                      className=" mx-auto mt-2 w-fit cursor-pointer rounded-lg border-2  border-red-500 bg-red-500 p-1 text-lg text-white hover:bg-white hover:text-black"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Fade>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  )
}
