import Head from 'next/head'
import Link from 'next/link'
import { Zoom } from 'react-reveal'
import Fade from 'react-reveal/Fade'
import aboutSVG from '../../assets/images/about.svg'
import projectSVG from '../../assets/images/project.svg'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'

import NavBar from '../../components/Navbar'
import ScrollButton from '../../components/ScrollUp'
export default function Home() {
  return (
    <>
      <div className="h-full bg-red-100">
        <Head>
          <title>Home | Youtube Wrapped</title>
          <meta
            name="description"
            content="A Website to generate your own Youtube Wrapped"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <NavBar active={{}} />
        <Zoom>
          <div className="mx-auto mt-10 w-full rounded-lg bg-white p-10 shadow-md sm:w-2/3">
            <Fade left>
              <div className="mx-auto w-fit text-center text-3xl font-medium text-red-700 sm:text-4xl">
                About Youtube Wrapped
              </div>
            </Fade>
            <Fade right>
              <img
                src={aboutSVG.src}
                alt="about ytw"
                className=" mx-auto mt-10"
              />
            </Fade>
            <Fade left>
              <div className="mt-10 text-center text-lg">
                <p className="text-left">
                  Ever wondered what hours of binging content on Youtube looks
                  like? Welcome To
                  <span className="mx-1 font-medium text-red-600">
                    Youtube Wrapped
                  </span>
                  , a One-Stop solution to know about your personal youtube
                  statistics and data. You just need to Sign-Up to Youtube
                  Wrapped, and authorize the application, thats it! Your Wrap is
                  ready to be served to you. There are a large number of metrics
                  you get access to, that will give you insights about your
                  Youtube watching habbits.
                </p>
                <p className="mt-2 text-left">
                  This project is inspired by an analogous thing done by
                  Spotify, called Spotify Wrapped . Towards the end of last
                  year, in December 2021, I got my very first
                  <span className="mx-1 font-medium text-green-600">
                    <a
                      href="https://spotify.burhanuddinmerchant.ml/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Spotify Wrapped
                    </a>
                  </span>
                  , and since then, I knew I had to do something similar to that
                  , related to Youtube. So here we go, this is YouTube Wrapped
                  for you.
                </p>
                <div className="mx-auto mt-5 w-fit">
                  <iframe
                    className=" sm:h-52 sm:w-96"
                    src="https://www.youtube.com/embed/V7JnDTsLDbk"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Fade>
            <hr className="mt-5" />
            <hr className="mt-5" />
            <Fade right>
              <div className="mx-auto mt-5 w-fit text-center text-3xl font-medium text-red-700 sm:text-4xl">
                About The Project
              </div>
            </Fade>
            <Fade left>
              <img
                src={projectSVG.src}
                alt="about project"
                className=" mx-auto mt-10"
              />

              <div className="mt-10 text-center text-lg">
                <p className="text-left">
                  This is a Full Stack Web Application built around an{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Extract,_transform,_load"
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-700"
                  >
                    ETL
                  </a>
                  data pipeline.
                </p>
                <p className="mt-2 text-left">
                  I wanted to set up an ETL Data-Pipeline from a very long time,
                  and also improve upon my Front-End development skills (UI and
                  Design), and at the same time wanted to do something related
                  to Cloud and DevOps, so when I randomly came up with a
                  meaningful and fun problem statement, all of the desires
                  listed above just fell into place, and I started working on
                  what you are seeing right now.
                </p>
                <hr className="mt-5" />
              </div>
            </Fade>
            <Fade right>
              <div className="mx-auto mt-5 w-fit text-center text-3xl font-medium text-red-700 sm:text-4xl">
                What Happens with your data?
              </div>
            </Fade>
            <Fade left>
              <div className="mt-10 text-center text-lg">
                <p className="text-left">
                  After you have successfully provided your google
                  authorization, the application gets access to your youtube
                  data, of which the application only ever accesses your 200
                  recently liked and disliked videos and stores it. Once you
                  request for the data on the dashboard ,it is displayed back to
                  you. The data has restricted access. Only you (having the
                  right authorization) will ever be able to access the data
                  along with the Database Administrator.
                </p>
                <hr className="mt-5" />
                <p className="mt-5">
                  So what are you waiting for ?
                  <Link href="/login">
                    <button className="mx-2 animate-pulse cursor-pointer rounded-lg border-2 border-red-600 bg-red-600 px-1 font-medium text-white hover:bg-white hover:text-black">
                      Click Here
                    </button>
                  </Link>
                  and Get Your Wrap Right Now!
                </p>
              </div>
            </Fade>
            <a
              href="https://privacy-policy.youtubewrapped.ml/"
              className="mx-auto flex w-fit cursor-pointer hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <p className="mx-auto my-auto mr-1 w-fit ">Privacy Policy</p>
              <ArrowCircleRightIcon className="my-auto mx-auto h-5 w-5" />
            </a>
          </div>
        </Zoom>
      </div>
      <ScrollButton />
    </>
  )
}
