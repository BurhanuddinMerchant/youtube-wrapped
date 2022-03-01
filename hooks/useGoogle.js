import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useGoogle() {
  const router = useRouter()
  useEffect(() => {
    const handleClientLoad = () =>
      window.gapi.load('client:auth2', function () {
        window.gapi.auth2
          .init({
            client_id: process.env.NEXT_PUBLIC_YT_OAUTH2_CLIENT_ID,
          })
          .then(
            authenticate()
              .then(loadClient)
              .then(() => {
                sessionStorage.setItem(
                  'yt_access_token',
                  window.gapi.client.getToken().access_token
                )
                router.push('/dashboard')
              })
          )
          .catch((e) => {
            // console.log(e)
          })
      })

    function loadClient() {
      window.gapi.client.setApiKey(process.env.NEXT_PUBLIC_YT_API_SECRET)
      return window.gapi.client
        .load(process.env.NEXT_PUBLIC_YT_DISCOVERY_URL)
        .then(
          function () {
            // console.log('GAPI client loaded for API')
          },
          function (err) {
            // console.error('Error loading GAPI client for API', err)
            throw err
          }
        )
    }
    function authenticate() {
      return window.gapi.auth2
        .getAuthInstance()
        .signIn({ scope: process.env.NEXT_PUBLIC_YT_OAUTH_SCOPE })
        .then(
          function () {},
          function (err) {
            throw err
          }
        )
    }
    const script = document.createElement('script')

    script.src = 'https://apis.google.com/js/api.js'
    script.async = true
    script.defer = true
    script.onload = handleClientLoad

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return <></>
}
