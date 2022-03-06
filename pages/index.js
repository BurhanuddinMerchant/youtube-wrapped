import Head from 'next/head'
import AnalyticsSVG from '../assets/images/hero_analytics_dark.svg'
import Fade from 'react-reveal/Fade'
import { Zoom } from 'react-reveal'
import NavBar from '../components/Navbar'
export default function Home() {
  return (
    <>
      <Head>
        <title>Landing Page | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="box-border h-screen w-full bg-red-100">
        <NavBar active={{ home: true }} />
        <div className="mx-auto rounded-lg bg-red-100 p-5 sm:w-1/2">
          <Fade left>
            <h1 className="mx-auto my-10 w-fit text-center text-3xl font-bold text-red-600 sm:text-6xl">
              Welcome To Youtube Wrapped
            </h1>
          </Fade>
          <Zoom>
            <Fade left>
              <img src={AnalyticsSVG.src} className="w-full"></img>
            </Fade>
          </Zoom>
        </div>
      </div>
    </>
  )
}
