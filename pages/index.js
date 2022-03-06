import Head from 'next/head'
import Link from 'next/link'
import YoutubeSVG from '../assets/images/youtube.svg'
import AnalyticsSVG from '../assets/images/hero_analytics_dark.svg'
// import { Fade, Bounce, Flip } from 'react-awesome-reveal'
import Fade from 'react-reveal/Fade'
import { Zoom } from 'react-reveal'

export default function Home() {
  return (
    <>
      <Head>
        <title>Landing Page | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="box-border h-screen w-full bg-red-100">
        <Fade right cascade>
          <div className="flex flex-col  justify-between pt-2 sm:flex-row ">
            <div className="mx-auto flex w-fit justify-center sm:mx-10 ">
              <img src={YoutubeSVG.src} className=" h-10" />
              <h1 className="my-auto mx-2 text-xl font-bold text-red-900">
                YTW
              </h1>
            </div>

            <div className="my-auto mx-auto text-lg sm:mr-14" id="mobile-menu">
              <ul className="flex flex-col text-center sm:flex-row  sm:space-x-8">
                <li>
                  <Link href="/" ariaCurrent="page">
                    <p className="cursor-pointer p-1 text-lg font-medium text-red-600">
                      Home
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <p className="cursor-pointer rounded-lg p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white">
                      Explore
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <p className="cursor-pointer rounded-lg p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white">
                      About
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <p className="cursor-pointer rounded-lg p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white">
                      Contact
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
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
