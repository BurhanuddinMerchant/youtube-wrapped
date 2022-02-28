import { InformationCircleIcon, StarIcon } from '@heroicons/react/solid'
InformationCircleIcon
export const TopThreeCard = (props) => {
  const star_color = ['text-yellow-500', 'text-gray-300', 'text-amber-600']
  const { top, title } = props.data
  return (
    <>
      <div className=" my-10 w-96 rounded-md bg-slate-100 shadow-md hover:shadow-lg">
        <div className="flex flex-row justify-between rounded-t-md bg-red-400 p-2 ">
          <h1>{title}</h1>
          <div>
            <InformationCircleIcon className="h-5 w-5 text-blue-200 hover:text-blue-300" />
          </div>
        </div>
        {top.map((element, i) => (
          <div
            className={`flex flex-row justify-between border-b-2 p-2  transition delay-75 ease-in-out  hover:scale-105 hover:bg-white`}
          >
            {/* <div>{`#${i + 1}`}</div> */}
            <StarIcon className={`h-5 w-5 ${star_color[i]}`} />
            <div>
              {element['key'] === 'undefined' ? 'unspecified' : element['key']}
            </div>
            <div>{element['value']}</div>
          </div>
        ))}
      </div>
    </>
  )
}
