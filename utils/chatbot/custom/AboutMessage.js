import Link from 'next/link'

export const AboutMessage = (props) => {
  return (
    <div className="w-fit cursor-pointer rounded-full border-2 border-red-400 p-1 hover:bg-red-400 hover:text-white">
      <Link href="/about">About</Link>
    </div>
  )
}
