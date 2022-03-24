import { useEffect, useState } from 'react'
import { loadScript } from '../../utils/loadScript'
export default function Recaptcha() {
  const [isHuman, setIsHuman] = useState(false)
  useEffect(async () => {
    const res = await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']}`
    )
  }, [])
  function handleClick() {
    grecaptcha.ready(async function () {
      grecaptcha
        .execute(process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY'], {
          action: 'submit',
        })
        .then(async (token) => {
          let response = await fetch(
            `${process.env['NEXT_PUBLIC_SERVER_BASE_URL']}/api/recaptcha?token=${token}hel`
          )
          response = await response.json()
          setIsHuman(response['verified'])
        })
    })
  }
  return (
    <>
      <button onClick={handleClick}>Recaptcha</button>
      <div>{isHuman ? 'Human' : 'Robot'}</div>
    </>
  )
}
