export const Unwrapped = () => {
  const makeStatsGenerationAPICall = () => {}
  return (
    <div className="flex flex-col justify-between">
      <div>
        It Seems like You have not yet applied to generate your wrap, click
        below to generate your Wrap
      </div>
      <button
        className=" mx-auto my-2 w-fit cursor-pointer  rounded-md bg-white px-2 py-1 hover:bg-red-600 hover:text-red-100"
        onClick={makeStatsGenerationAPICall}
      >
        UnWrap
      </button>
    </div>
  )
}
