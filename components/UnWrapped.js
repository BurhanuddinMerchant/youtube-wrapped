import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ConditionalButton from './ConditionalButton'
export default function Unwrapped(props) {
  const { setStatsAvailable } = props
  const router = useRouter()
  const [YTAccessToken, setYTAccessToken] = useState(null)
  const [AuthToken, setAuthToken] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [doneUnWrapping, setDoneUnWrapping] = useState(false)
  useEffect(() => {
    setYTAccessToken(sessionStorage.getItem('yt_access_token'))
    setAuthToken(sessionStorage.getItem('token'))
  }, [])
  useEffect(() => {
    if (doneUnWrapping) {
      setStatsAvailable(true)
    }
  }, [])
  const makeStatsGenerationAPICall = () => {
    setLoading(true)
    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${AuthToken}`)
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      auth_token: YTAccessToken,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/test/generate`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false)
        // router.push('/dashboard')
        setDoneUnWrapping(true)
        console.log(result)
      })
      .catch((error) => {
        setLoading(false)
        console.log('error', error)
      })
  }
  return (
    <div className="flex flex-col justify-between">
      {YTAccessToken ? (
        <>
          <div>
            It Seems like You have not yet applied to generate your wrap, click
            below to UnWrap. Please Note it may take upto 30s for the data to
            load
          </div>
          <ConditionalButton
            onClickFunction={makeStatsGenerationAPICall}
            isLoading={isLoading}
            doneUnWrapping={doneUnWrapping}
            proceedFunction={() => {
              setStatsAvailable(true)
            }}
          />
        </>
      ) : (
        <>
          <div>
            It Seems like You have not yet applied to generate your wrap, click
            below to Authorize our application to generate your Wrap
          </div>
          <button
            className="mx-auto my-2 w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600 hover:text-red-100 hover:shadow-sm hover:shadow-red-300"
            onClick={() => router.push('/authorize')}
          >
            Authorize
          </button>
        </>
      )}
    </div>
  )
}
