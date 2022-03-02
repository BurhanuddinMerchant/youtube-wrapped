import { InformationCircleIcon, StarIcon } from '@heroicons/react/solid'
import InfoModal from './InfoModal'
InformationCircleIcon
export default function TopThreeCard(props) {
  const star_color = ['text-yellow-500', 'text-gray-300', 'text-amber-600']
  const { top, title, infoDescription } = props.data
  return (
    <>
      <div className=" my-10 w-full rounded-md bg-slate-100 shadow-md hover:shadow-lg sm:w-96">
        <div className="flex flex-row justify-between rounded-t-md bg-red-400 p-2 ">
          <h1 className=" font-medium">{title}</h1>
          <div>
            <InfoModal
              title={title}
              description={
                infoDescription || 'Description Not Available At the moment'
              }
            />
          </div>
        </div>
        {top.length !== 0 ? (
          top.map((element, i) => (
            <div
              key={i}
              className={`flex flex-row justify-between border-b-2 p-2  transition delay-75 ease-in-out  hover:scale-105 hover:bg-white`}
            >
              {/* <div>{`#${i + 1}`}</div> */}
              <StarIcon className={`h-5 w-5 ${star_color[i]}`} />
              <div>
                {element['key'] === 'undefined'
                  ? 'unspecified'
                  : element['key']}
              </div>
              <div>{element['value']}</div>
            </div>
          ))
        ) : (
          <div className={`flex flex-row justify-between  p-2 `}>
            {/* <div>{`#${i + 1}`}</div> */}

            <div className=" mx-auto">Data Unavailable</div>
          </div>
        )}
      </div>
    </>
  )
}
