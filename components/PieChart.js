import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart(props) {
  const { labels, dataList, label } = props
  console.log(label)
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataList,
        backgroundColor: ['lightgreen', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['green', 'red'],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={data} />
}
