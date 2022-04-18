import Head from 'next/head'
import AnalyticsSVG from '../assets/images/hero_analytics_dark.svg'
import Fade from 'react-reveal/Fade'
import { Zoom } from 'react-reveal'
import NavBar from '../components/Navbar'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from '../utils/chatbot/config'
import MessageParser from '../utils/chatbot/MessageParser'
import ActionProvider from '../utils/chatbot/ActionProvider'
import ChatBotIcon from '../assets/images/chatbot.png'
import { useState } from 'react'
import useAnalytics from '../hooks/useAnalytics'
import HomeImage from '../assets/images/home.png'
import Typewriter from 'typewriter-effect'

export default function Home() {
  const [showChatBot, setShowChatBox] = useState(false)
  useAnalytics()

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
      <div className="box-border min-h-screen w-full bg-red-100">
        <NavBar active={{ home: true }} />
        <div
          className="mx-auto rounded-lg bg-red-100 p-5 sm:w-1/2"
          onClick={() => setShowChatBox(false)}
        >
          <Fade top>
            <h1 className="mx-auto my-10 w-fit text-center text-3xl font-bold text-red-600 sm:text-6xl">
              {/* YOUTUBEWRAPPED */}
              <Typewriter
                onInit={(typewriter) => {
                  typewriter

                    .typeString('LIKED ')

                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('DISLIKED ')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('YOUTUBEWRAPPED ')
                    .start()
                }}
              />
            </h1>
          </Fade>
          <Zoom>
            <Fade bottom>
              <img
                src={AnalyticsSVG.src}
                alt="landing"
                className="w-full"
              ></img>
            </Fade>
          </Zoom>
        </div>
        <div className=" fixed right-5 bottom-5">
          {showChatBot ? (
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              validator={(message) => {
                if (message) return true
              }}
            />
          ) : (
            <div
              className="h-14 w-14 cursor-pointer rounded-full bg-red-500 p-2 shadow-2xl hover:bg-red-400"
              onClick={() => setShowChatBox(true)}
            >
              <img src={ChatBotIcon.src} alt="chatbot" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
