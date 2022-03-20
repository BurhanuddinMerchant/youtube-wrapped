import { useEffect } from 'react'
import { loadScript } from '../utils/loadScript'
export default function useAnalytics() {
  useEffect(async () => {
    const res = await loadScript(
      'https://www.googletagmanager.com/gtag/js?id=G-F0Y4894T8G'
    )
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', 'G-F0Y4894T8G')
  }, [])
  return <></>
}
