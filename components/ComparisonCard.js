import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid'
import InfoModal from './InfoModal'

export default function ComparisonCard(props) {
  const { title, liked, disliked, infoDescription } = props.data
  return (
    <div className=" my-10 w-full cursor-pointer rounded-md bg-slate-100 shadow-md hover:shadow-lg sm:w-96">
      <div className="flex flex-row justify-between rounded-t-md bg-red-400 p-2">
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
      <div className="my-5 flex flex-row justify-between p-2">
        <div className="flex flex-col justify-center p-2 ">
          <div>
            <ThumbUpIcon className=" mx-auto h-5 w-5 text-green-500 hover:animate-bounce" />
          </div>
          <div>{liked ? Number(liked.toFixed(1)) : 0}</div>
        </div>
        <div className="flex flex-col justify-center p-2">
          <div>
            <ThumbDownIcon className="h-5 w-5  text-red-500 hover:animate-bounce" />
          </div>
          <div>{disliked ? Number(disliked.toFixed(1)) : 0}</div>
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
