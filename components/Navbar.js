import Link from 'next/link'
import { Fade } from 'react-reveal'
import YoutubeSVG from '../assets/images/youtube.svg'
import { useState } from 'react'
export default function NavBar(props) {
  const { active } = props
  const [showNav, setShowNav] = useState(false)
  const normal_style =
    'cursor-pointer rounded-lg p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white'
  const normal_style_mobile =
    'cursor-pointer p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white'
  const active_style = 'cursor-pointer p-1 text-lg font-medium text-red-600'
  const active_style_mobile =
    'cursor-pointer p-1 text-lg font-medium text-red-600'
  return (
    <>
      <div className="sm:hidden">
        <div className="flex justify-between p-2">
          <div className="flex w-fit justify-center">
            <img src={YoutubeSVG.src} alt="logo" className=" h-10" />
            <h1 className="my-auto mx-2 text-xl font-bold text-red-900">YTW</h1>
          </div>
          <svg
            viewBox="0 0 50 50"
            width="2.5rem"
            height="2.5rem"
            className="cursor-pointer fill-red-600 hover:fill-red-800"
            onClick={() => setShowNav(!showNav)}
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z" />
          </svg>
        </div>
        {showNav ? (
          <div className="my-auto mx-auto text-lg transition delay-150 ease-in-out ">
            <ul className="flex flex-col text-center">
              <li>
                <Link href="/" ariaCurrent="page">
                  <p
                    className={
                      active['home'] ? active_style_mobile : normal_style_mobile
                    }
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <p
                    className={
                      active['explore']
                        ? active_style_mobile
                        : normal_style_mobile
                    }
                  >
                    Explore
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p
                    className={
                      active['about']
                        ? active_style_mobile
                        : normal_style_mobile
                    }
                  >
                    About
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p
                    className={
                      active['contact']
                        ? active_style_mobile
                        : normal_style_mobile
                    }
                  >
                    Contact
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <Fade right cascade>
        <div className="hidden justify-between pt-2 sm:flex sm:flex-row">
          <div className="mx-auto flex w-fit justify-center sm:mx-10 ">
            <img src={YoutubeSVG.src} alt="logo" className=" h-10" />
            <h1 className="my-auto mx-2 text-xl font-bold text-red-900">YTW</h1>
          </div>

          <div className="my-auto mx-auto text-lg sm:mr-14">
            <ul className="flex flex-col text-center sm:flex-row  sm:space-x-8">
              <li>
                <Link href="/" ariaCurrent="page">
                  <p className={active['home'] ? active_style : normal_style}>
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <p
                    className={active['explore'] ? active_style : normal_style}
                  >
                    Explore
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p className={active['about'] ? active_style : normal_style}>
                    About
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p
                    className={active['contact'] ? active_style : normal_style}
                  >
                    Contact
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Fade>
    </>
  )
}
