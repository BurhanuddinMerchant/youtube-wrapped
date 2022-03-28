import NavBar from '../../components/Navbar'
import Head from 'next/head'

export default function () {
  return (
    <>
      <div className="h-full bg-red-100">
        <Head>
          <title>Home | Youtube Wrapped</title>
          <meta
            name="description"
            content="A Website to generate your own Youtube Wrapped"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <NavBar active={{}} />
      </div>
    </>
  )
}
