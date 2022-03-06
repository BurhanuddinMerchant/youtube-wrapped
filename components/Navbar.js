import Link from 'next/link'
import { Fade } from 'react-reveal'
import YoutubeSVG from '../assets/images/youtube.svg'

export default function NavBar(props) {
  const { active } = props
  const normal_style =
    'cursor-pointer rounded-lg p-1 text-lg font-medium text-red-400 hover:bg-red-600 hover:text-white'
  const active_style = 'cursor-pointer p-1 text-lg font-medium text-red-600'
  return (
    <Fade right cascade>
      <div className="flex flex-col  justify-between pt-2 sm:flex-row ">
        <div className="mx-auto flex w-fit justify-center sm:mx-10 ">
          <img src={YoutubeSVG.src} className=" h-10" />
          <h1 className="my-auto mx-2 text-xl font-bold text-red-900">YTW</h1>
        </div>

        <div className="my-auto mx-auto text-lg sm:mr-14" id="mobile-menu">
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
                <p className={active['explore'] ? active_style : normal_style}>
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
                <p className={active['contact'] ? active_style : normal_style}>
                  Contact
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fade>
  )
}
