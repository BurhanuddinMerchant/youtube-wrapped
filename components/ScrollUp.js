import React, { useState } from 'react'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <button
      className={`${
        visible ? 'block' : 'hidden'
      } fixed bottom-5 right-5 rounded-full bg-red-600 hover:bg-red-500`}
    >
      <ArrowCircleUpIcon
        onClick={scrollToTop}
        className={` h-14 w-14 text-white hover:text-slate-100`}
      />
    </button>
  )
}

export default ScrollButton
