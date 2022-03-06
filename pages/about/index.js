import Head from 'next/head'
import Link from 'next/link'
import { Zoom } from 'react-reveal'
import Fade from 'react-reveal/Fade'
import aboutSVG from '../../assets/images/about.svg'
import meSVG from '../../assets/images/me.svg'
import projectSVG from '../../assets/images/project.svg'
import { CodeIcon, MusicNoteIcon } from '@heroicons/react/solid'
import NavBar from '../../components/Navbar'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-full bg-red-100 pb-20">
        <NavBar active={{ about: true }} />

        <Zoom>
          <div className="mx-auto mt-10 w-full rounded-lg bg-white p-10 shadow-md sm:w-2/3">
            <Fade left>
              <div className="mx-auto w-fit text-2xl font-medium text-red-700">
                About Youtube Wrapped
              </div>
            </Fade>
            <Fade right>
              <img src={aboutSVG.src} alt="about" className=" mx-auto mt-10" />
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
                  you get access to ,that will give you insights about your
                  Youtube watching habbits.
                </p>
                <p className="mt-2 text-left">
                  This project is inspired by an analogous thing done by
                  Spotify, called Spotify Wrapped. Towards the end of last year,
                  in December 2021 , I got my very first
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
                  , related to Youtube. So here we go , this is YouTube Wrapped
                  for you.
                </p>
              </div>
            </Fade>
            <hr className="mt-5" />
            <Fade left>
              <div className="mx-auto mt-5 w-fit text-2xl font-medium text-red-700 ">
                About Me
              </div>
            </Fade>
            <Fade right>
              <img src={meSVG.src} alt="about" className=" mx-auto mt-10" />
            </Fade>
            <Fade left>
              <div className="mt-10 text-center text-lg">
                <p className="text-left">
                  I am
                  <a
                    href="https://burhanuddinmerchant.ml"
                    target="_blank"
                    className="ml-2 font-medium text-red-600"
                    rel="noreferrer"
                  >
                    Burhanuddin Merchant
                  </a>
                  , an Engineering Undergrad, majoring in Computer Engineering.
                  I produce
                  <a
                    href="https://www.instagram.com/musicbyburza/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MusicNoteIcon className="mx-1 inline h-5 w-5 animate-bounce cursor-pointer text-purple-500 hover:text-slate-400" />
                  </a>
                  and write
                  <a
                    href="https://burhanuddinmerchant.ml"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CodeIcon className="mx-1 inline h-5 w-5 animate-bounce cursor-pointer text-blue-500 hover:text-slate-400" />
                  </a>
                  sometimes. I love collab ...blah blah. I love building real
                  world .... blah blah blah.
                </p>
                <p className="mt-2 text-left">
                  For those of you interested in the blah blah blahs , please
                  visit
                  <a
                    href="https://burhanuddinmerchant.ml"
                    target="_blank"
                    className="ml-2 animate-pulse cursor-pointer font-medium text-red-600"
                    rel="noreferrer"
                  >
                    burhanuddinmerchant.ml
                  </a>
                </p>
              </div>
            </Fade>
            <hr className="mt-5" />
            <Fade right>
              <div className="mx-auto mt-5 w-fit text-2xl font-medium text-red-700">
                About The Project
              </div>
            </Fade>
            <Fade left>
              <img
                src={projectSVG.src}
                alt="about"
                className=" mx-auto mt-10"
              />

              <div className="mt-10 text-center text-lg">
                <p className="text-left">
                  This is a Full Stack Web Application built around an ETL data
                  pipeline.
                </p>
                <p className="mt-2 text-left">
                  I wanted to set up a Data-Pipeline from a very long time, and
                  also improve upon my Front-End development skills (UI and
                  Design), and at the same time wanted to do something related
                  to Cloud and DevOps, so when I randomly came up with a
                  meaningful and fun (according to me XD) problem statement, all
                  of the desires listed above just fell into place , and I
                  started to work on what you are seeing right now.
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
          </div>
        </Zoom>
      </div>
    </>
  )
}
