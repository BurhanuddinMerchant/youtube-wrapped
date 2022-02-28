import { useEffect, useState } from 'react'
import { ComparisonCard } from './utils/ComparisonCard'
import { TopThreeCard } from './utils/TopThreeCard'
// import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
export const StatsSection = (props) => {
  const { stats } = props
  const [processedData, setProcessedData] = useState(null)
  useEffect(() => {
    setProcessedData({ ...getProcessedStats(stats) })
    console.log(processedData)
  }, [])
  return (
    <>
      <div className=" flex w-full cursor-pointer flex-wrap justify-evenly p-10">
        <ComparisonCard
          data={{
            title: 'Total Rated Videos',
            liked: stats.total_rated_videos.liked,
            disliked: stats.total_rated_videos.disliked,
          }}
        />
        <ComparisonCard
          data={{
            title: 'Average Rating Gap (In Days)',
            liked: stats.average_rating_gap.liked,
            disliked: stats.average_rating_gap.disliked,
          }}
        />
        {processedData
          ? Object.keys(processedData).map((key) => {
              if (key == 'duration') {
                return <></>
              }
              return (
                <>
                  <TopThreeCard
                    data={{
                      top: processedData[key]['liked'],
                      title: `Top 3 Liked ${processedData[key]['title_helper']}`,
                    }}
                  />
                  <TopThreeCard
                    data={{
                      top: processedData[key]['disliked'],
                      title: `Top 3 Disiked ${processedData[key]['title_helper']}`,
                    }}
                  />
                </>
              )
            })
          : ''}
      </div>
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
  return [max1, max2, max3]
}
const getProcessedStats = (stats) => {
  const processedData = {
    channelTitle: { liked: {}, disliked: {}, title_helper: 'Channels' },
    topic: { liked: {}, disliked: {}, title_helper: 'Topics' },
    tags: { liked: {}, disliked: {}, title_helper: 'Tags' },
    language: { liked: {}, disliked: {}, title_helper: 'Languages' },
    duration_per_channel: {
      liked: {},
      disliked: {},
      title_helper: 'Most Viewed Channel (in sec)',
    },
    duration_per_language: {
      liked: {},
      disliked: {},
      title_helper: 'Most Viewed Language (in sec)',
    },
    duration_per_topic: {
      liked: {},
      disliked: {},
      title_helper: 'Most Viewed Topic (in sec)',
    },
  }
  for (let data_point in processedData) {
    processedData[data_point]['liked'] = getTopThreeFromDataObject(
      stats[data_point]['liked']
    )
    processedData[data_point]['disliked'] = getTopThreeFromDataObject(
      stats[data_point]['disliked']
    )
  }
  processedData['duration'] = stats['duration']
  return processedData
}
