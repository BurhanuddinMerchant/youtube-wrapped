import { ExclamationIcon, ArrowCircleRightIcon } from '@heroicons/react/solid'
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
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/generate`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false)
        // router.push('/dashboard')
        setDoneUnWrapping(true)
        // console.log(result)
      })
      .catch((error) => {
        setLoading(false)
        // console.log('error', error)
      })
  }
  return (
    <div className=" flexlex-col justify-between">
      <div className="mx-5 mt-14 flex w-fit flex-col rounded-md bg-red-50 p-5  shadow-md sm:mx-auto">
        <div className="mx-auto mb-2 flex">
          <p className="my-auto w-fit text-center text-xl font-bold text-red-500">
            Note
          </p>
          <ExclamationIcon className="h-7 w-7 text-red-500" />
        </div>
        {YTAccessToken ? (
          <>
            <div className="text-center">
              It Seems like You have not yet applied to generate your wrap,
              click below to UnWrap. Please Note it may take upto 30s for the
              data to load
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
            <div className="text-center">
              It Seems like You have not yet applied to generate your wrap,
              click below to Authorize our application to generate your Wrap
            </div>
            <button
              className="mx-auto my-2 w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600 hover:shadow-sm hover:shadow-red-300"
              onClick={() => router.push('/authorize')}
            >
              Authorize
            </button>
          </>
        )}
        <a
          href="https://www.freeprivacypolicy.com/live/5b748d69-c3dd-4aee-bc91-be3a5ef8f2a9"
          className="mx-auto flex w-fit cursor-pointer hover:text-gray-400"
          target="_blank"
        >
          <p className="mx-auto my-auto mr-1 w-fit ">Privacy Plicy</p>
          <ArrowCircleRightIcon className="my-auto mx-auto h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
