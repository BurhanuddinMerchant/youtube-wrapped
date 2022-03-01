export const ConditionalButton = (props) => {
  const { onClickFunction, proceedFunction, isLoading, doneUnWrapping } = props
  return (
    <button
      className={`mx-auto my-2 w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600 hover:text-red-100 hover:shadow-sm hover:shadow-red-300 ${
        isLoading ? 'animate-bounce' : ''
      }`}
      onClick={
        isLoading
          ? () => {}
          : doneUnWrapping
          ? proceedFunction
          : onClickFunction
      }
    >
      {isLoading ? 'Loading...' : doneUnWrapping ? 'Proceed' : 'UnWrap'}
    </button>
  )
}
