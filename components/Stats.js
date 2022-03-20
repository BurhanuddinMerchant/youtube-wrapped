import { useEffect, useState } from 'react'
import BarGraph from './BarGraph'
import ComparisonCard from './ComparisonCard'
import TopThreeCard from './TopThreeCard'
import GraphIcon from '../assets/images/graph.png'
import { ExclamationIcon } from '@heroicons/react/solid'
import PieChart from './PieChart'
import ScrollButton from './ScrollUp'
// import LineGraph from './LineGraph'

export default function StatsSection(props) {
  const { stats } = props
  const [processedData, setProcessedData] = useState(null)
  useEffect(() => {
    setProcessedData({ ...getProcessedStats(stats) })
    console.log(getProcessedStats(stats))
  }, [])
  return (
    <>
      <div className=" flex w-full flex-wrap justify-evenly p-10">
        <ComparisonCard
          data={{
            title: 'Total Rated Videos',
            liked: stats.total_rated_videos.liked,
            disliked: stats.total_rated_videos.disliked,
            infoDescription:
              'The total number of Youtube videos you have rated (liked/disliked) till date',
          }}
        />
        <ComparisonCard
          data={{
            title: 'Average Rating Gap (In Days)',
            liked: stats.average_rating_gap.liked,
            disliked: stats.average_rating_gap.disliked,
            infoDescription:
              'This indicates the average gap (in days) between any two likes/dislikes',
          }}
        />
        {processedData
          ? Object.keys(processedData).map((key, i) => {
              if (key == 'duration') {
                return <></>
              }
              return (
                <>
                  <TopThreeCard
                    key={i}
                    data={{
                      top: processedData[key]['liked'],
                      title: `Top 3 Liked ${processedData[key]['title_helper']}`,
                      infoDescription: processedData[key]['info'],
                      all: processedData[key]['all_liked'],
                      all_title: `All Liked ${processedData[key]['title_helper']}`,
                      unit: processedData[key]['unit_liked'],
                      field: processedData[key]['field'],
                    }}
                  />
                  <TopThreeCard
                    key={``}
                    data={{
                      top: processedData[key]['disliked'],
                      title: `Top 3 Disiked ${processedData[key]['title_helper']}`,
                      infoDescription: processedData[key]['info'],
                      all: processedData[key]['all_disliked'],
                      all_title: `All Disliked ${processedData[key]['title_helper']}`,
                      unit: processedData[key]['unit_disliked'],
                      field: processedData[key]['field'],
                    }}
                  />
                </>
              )
            })
          : ''}
      </div>
      <hr className="h-1 bg-slate-300" />
      <div>
        <div className="mt-7 flex justify-center ">
          <img src={GraphIcon.src} className="w-16" alt="graph" />
          <h1 className=" my-auto ml-2 text-5xl font-medium">Data Graphs</h1>
        </div>
        <div className="m-10 w-fit  rounded-md bg-red-100 p-10 text-center shadow-md md:hidden">
          <div className="mx-auto mb-2 flex w-fit">
            <p className="my-auto w-fit text-center text-xl font-bold text-red-500">
              Caution
            </p>
            <ExclamationIcon className="h-7 w-7 text-red-500" />
          </div>
          This Feature Is Only Accessible On Desktops, please Switch to a
          desktop in order to view this content
        </div>
        {processedData
          ? Object.keys(processedData).map((key, id) => {
              if (key == 'duration') {
                return <></>
              }
              const listToObj = (list) => {
                let obj = {}
                list.map((k) => {
                  if (k['value'] !== -1) {
                    obj[k['key']] = k['value']
                  }
                })
                return obj
              }
              return (
                <div className="hidden w-full md:block" key={id}>
                  <div className="flex border-b-2 border-slate-300 py-10">
                    <div className="w-1/2">
                      <BarGraph
                        dataObj={listToObj(processedData[key]['liked'])}
                        label={`Top 3 Liked ${processedData[key]['title_helper']}`}
                        borderColor="green"
                        bgColor="lightgreen"
                      />
                    </div>
                    <div className="w-1/2">
                      <BarGraph
                        dataObj={listToObj(processedData[key]['disliked'])}
                        label={`Top 3 Disiked ${processedData[key]['title_helper']}`}
                      />
                    </div>
                  </div>
                  <div className="w-full border-b-2  border-slate-300 py-10">
                    <BarGraph
                      dataObj={processedData[key]['all_liked']}
                      label={`All Liked ${processedData[key]['title_helper']}`}
                      borderColor="green"
                      bgColor="lightgreen"
                    />
                  </div>
                  <div className="w-full border-b-2  border-slate-300 py-10">
                    <BarGraph
                      dataObj={processedData[key]['all_disliked']}
                      label={`All Disiked ${processedData[key]['title_helper']}`}
                    />
                  </div>
                </div>
              )
            })
          : ''}
        <div className="flex flex-wrap justify-center">
          {processedData
            ? Object.keys(processedData).map((key, id) => {
                if (key == 'duration') {
                  return <></>
                }
                return (
                  <div
                    className="hidden w-1/4 border-b-2 border-slate-300  py-10 md:block"
                    key={id}
                  >
                    <div className="">
                      <PieChart
                        dataList={[
                          processedData[key]['total_liked'],
                          processedData[key]['total_disliked'],
                        ]}
                        label={`Liked vs Disliked ${processedData[key]['title_helper']}`}
                        labels={['Liked', 'Disliked']}
                      />
                      <div className="mt-2 text-center font-normal text-slate-500">{`Liked vs Disliked ${processedData[key]['title_helper']}`}</div>
                    </div>
                  </div>
                )
              })
            : ''}
        </div>
      </div>
      <ScrollButton />
    </>
  )
}
const getTopThreeFromDataObject = (items) => {
  let max1 = { value: -1, key: undefined },
    max2 = { value: -1, key: undefined },
    max3 = { value: -1, key: undefined }
  for (let key in items) {
    if (items[key] >= max1['value']) {
      max3 = max2
      max2 = max1
      max1 = { key, value: items[key] }
    } else if (items[key] >= max2['value']) {
      max3 = max2
      max2 = { key, value: items[key] }
    } else if (items[key] > max3['value']) {
      max3 = { key, value: items[key] }
    }
  }
  let result = []
  if (max1.value !== -1) {
    result.push(max1)
  }
  if (max2.value !== -1) {
    result.push(max2)
  }
  if (max3.value !== -1) {
    result.push(max3)
  }
  return result
}
const getTotal = (items) => {
  let total = 0
  for (let key in items) {
    total += items[key]
  }
  return total
}
const getProcessedStats = (stats) => {
  const processedData = {
    channelTitle: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Channels',
      info: 'This Indicates the top 3 channels that you have liked/disliked based on the number of videos you have liked/disliked from that channel',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Channel Title',
      total_liked: 0,
      total_disliked: 0,
    },
    topic: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Topics',
      info: 'This Indicates the top 3 topics that you have liked/disliked based on the number of videos you have liked/disliked from that topic',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Topic',
      total_liked: 0,
      total_disliked: 0,
    },
    tags: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Tags',
      info: 'This Indicates the top 3 tags that you have liked/disliked based on the number of videos you have liked/disliked from that tag',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Tag',
      total_liked: 0,
      total_disliked: 0,
    },
    language: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Languages',
      info: 'This Indicates the top 3 languages that you have liked/disliked based on the number of videos you have liked/disliked from that language',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Language',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_channel: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Channel (in sec)',
      info: 'This indicates your most watched channels based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Channel Title',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_language: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Language (in sec)',
      info: 'This indicates your most watched languages based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Language',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_topic: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Topic (in sec)',
      info: 'This indicates your most watched topics based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Topic',
      total_liked: 0,
      total_disliked: 0,
    },
  }
  for (let data_point in processedData) {
    processedData[data_point]['liked'] = getTopThreeFromDataObject(
      stats[data_point]['liked']
    )
    processedData[data_point]['disliked'] = getTopThreeFromDataObject(
      stats[data_point]['disliked']
    )
    processedData[data_point]['all_liked'] = stats[data_point]['liked']
    processedData[data_point]['all_disliked'] = stats[data_point]['disliked']
    processedData[data_point]['total_liked'] = getTotal(
      stats[data_point]['liked']
    )
    processedData[data_point]['total_disliked'] = getTotal(
      stats[data_point]['disliked']
    )
  }
  processedData['duration'] = stats['duration']
  return processedData
}
