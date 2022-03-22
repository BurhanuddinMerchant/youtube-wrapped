import { useEffect, useState } from 'react'
import BarGraph from './BarGraph'
import ComparisonCard from './ComparisonCard'
import TopThreeCard from './TopThreeCard'
import GraphIcon from '../assets/images/graph.png'
import { ExclamationIcon } from '@heroicons/react/solid'
import PieChart from './PieChart'
import ScrollButton from './ScrollUp'
import { getProcessedStats } from '../utils/stats/getProcessedStats'
// import LineGraph from './LineGraph'

export default function StatsSection(props) {
  const { stats } = props
  const [processedData, setProcessedData] = useState(null)
  useEffect(() => {
    setProcessedData({ ...getProcessedStats(stats) })
    // console.log(getProcessedStats(stats))
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
      <hr />
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
                  <div className="m-5 mx-auto box-border w-2/3 cursor-pointer rounded-lg bg-slate-100 shadow-lg hover:bg-slate-100 ">
                    <div className="rounded-t-lg bg-red-400 p-3 text-2xl">{`Top 3 Liked ${processedData[key]['title_helper']}`}</div>
                    <div className="p-10">
                      <BarGraph
                        dataObj={listToObj(processedData[key]['liked'])}
                        label={`Top 3 Liked ${processedData[key]['title_helper']}`}
                        borderColor="green"
                        bgColor="lightgreen"
                      />
                    </div>
                  </div>
                  <div className="m-5 mx-auto box-border w-2/3 cursor-pointer rounded-lg bg-slate-100 shadow-lg hover:bg-slate-100">
                    <div className="rounded-t-lg bg-red-400 p-3 text-2xl">{`Top 3 Disiked ${processedData[key]['title_helper']}`}</div>
                    <div className="p-10">
                      <BarGraph
                        dataObj={listToObj(processedData[key]['disliked'])}
                        label={`Top 3 Disiked ${processedData[key]['title_helper']}`}
                      />
                    </div>
                  </div>
                  <div className="m-5 mx-auto box-border w-2/3 cursor-pointer rounded-lg bg-slate-100 shadow-lg hover:bg-slate-100">
                    <div className="rounded-t-lg bg-red-400 p-3 text-2xl">{`All Liked ${processedData[key]['title_helper']}`}</div>
                    <div className="p-10">
                      <BarGraph
                        dataObj={processedData[key]['all_liked']}
                        label={`All Liked ${processedData[key]['title_helper']}`}
                        borderColor="green"
                        bgColor="lightgreen"
                      />
                    </div>
                  </div>
                  <div className="m-5 mx-auto box-border w-2/3 cursor-pointer rounded-lg bg-slate-100 shadow-lg hover:bg-slate-100">
                    <div className="rounded-t-lg bg-red-400 p-3 text-2xl">{`All Disiked ${processedData[key]['title_helper']}`}</div>
                    <div className="p-10">
                      <BarGraph
                        dataObj={processedData[key]['all_disliked']}
                        label={`All Disiked ${processedData[key]['title_helper']}`}
                      />
                    </div>
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
                    className="m-5 box-border hidden w-1/4  bg-slate-100 shadow-lg md:block"
                    key={id}
                  >
                    <div className="rounded-t-lg bg-red-400 p-3 text-2xl">{`${processedData[key]['title_helper']}`}</div>

                    <div className="p-5">
                      <PieChart
                        dataList={[
                          processedData[key]['total_liked'],
                          processedData[key]['total_disliked'],
                        ]}
                        label={`Liked vs Disliked ${processedData[key]['title_helper']}`}
                        labels={['Liked', 'Disliked']}
                      />
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
