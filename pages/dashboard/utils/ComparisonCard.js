import {
  ThumbDownIcon,
  ThumbUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
export const ComparisonCard = (props) => {
  const { title, liked, disliked } = props.data
  return (
    <div className=" my-10 w-96 rounded-md bg-slate-100 shadow-md hover:shadow-lg">
      <div className="flex flex-row justify-between rounded-t-md bg-red-400 p-2">
        <h1>{title}</h1>
        <div>
          <InformationCircleIcon className="h-5 w-5 text-blue-200 hover:text-blue-300" />
        </div>
      </div>
      <div className="my-5 flex flex-row justify-between p-2">
        <div className="flex flex-col justify-center p-2 ">
          <div>
            <ThumbUpIcon className=" mx-auto h-5 w-5 text-green-500 " />
          </div>
          <div>{Number(liked.toFixed(1))}</div>
        </div>
        <div className="flex flex-col justify-center p-2">
          <div>
            <ThumbDownIcon className="h-5 w-5  text-red-500" />
          </div>
          <div>{Number(disliked.toFixed(1))}</div>
        </div>
      </div>
      <div className="flex w-full rounded-b-full">
        <div
          className="h-2 bg-green-500 "
          style={{
            width: `${(liked / (liked + disliked)) * 100}%`,
          }}
        ></div>
        <div
          className="h-2 bg-red-500"
          style={{
            width: `${(disliked / (liked + disliked)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
