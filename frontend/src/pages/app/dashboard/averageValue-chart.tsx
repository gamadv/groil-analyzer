import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export type AverageChartData = {
  period: string
  averageValue: number
}

type StatisticsProps = {
  averages: AverageChartData[]
}

export const StatisticsChart = (props: StatisticsProps) => {
  const { averages } = props
  const hasAverageData = averages.length > 0
  return !hasAverageData ? false : (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        data={averages}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='period' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='averageValue'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
