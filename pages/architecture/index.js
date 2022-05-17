import Head from 'next/head'
import arch from '../../assets/images/arch.svg'
export default function Authorize() {
  return (
    <>
      <Head>
        <title>Architecture | Youtube Wrapped</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="justify-center bg-red-100">
        <img src={arch.src} />
      </div>
    </>
  )
}
