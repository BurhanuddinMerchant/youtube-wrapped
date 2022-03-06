export default function Loading() {
  return (
    <div className="mx-auto mt-16 w-fit">
      <div className=" animate-pulse">
        <div
          style={{ borderTopColor: 'transparent' }}
          className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-red-400"
        ></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}
