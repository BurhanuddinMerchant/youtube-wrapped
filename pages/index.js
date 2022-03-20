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
      <div className="box-border h-screen w-full bg-red-100">
        <NavBar active={{ home: true }} />
        <div
          className="mx-auto rounded-lg bg-red-100 p-5 sm:w-1/2"
          onClick={() => setShowChatBox(false)}
        >
          <Fade top>
            <h1 className="mx-auto my-10 w-fit text-center text-3xl font-bold text-red-600 sm:text-6xl">
              Welcome To Youtube Wrapped
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
              className="h-20 w-20 cursor-pointer rounded-full bg-red-500 p-2 hover:bg-red-400"
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
