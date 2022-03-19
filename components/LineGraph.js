import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LineGraph(props) {
  const { dataObj, label, borderColor, bgColor } = props
  const labels = Object.keys(dataObj)
  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: label,
      },
    },
  }
  const data = {
    labels,
    datasets: [
      {
        label,
        data: labels.map((v) => dataObj[v]),
        borderColor: borderColor ? borderColor : 'rgb(255, 99, 132)',
        backgroundColor: bgColor ? bgColor : 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  return (
    <div className="">
      <Line options={options} data={data} />
    </div>
  )
}
