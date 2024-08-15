import { FC, useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'
import { useValidTemperature } from '@/hooks/useValidTemperature'

interface TemperatureData {
  time: string
  bedTemp: number
  hotendTemp: number
}

const TemperatureChart: FC<{ temperatures: any }> = ({ temperatures }) => {
  const { t } = useTranslation('printerStatus')
  const [data, setData] = useState<TemperatureData[]>([])

  const validTemperatures = useValidTemperature([
    temperatures[0]?.temperature,
    temperatures[1]?.temperature,
  ])
  // const [lastValidBedTemp, setLastValidBedTemp] = useState<number | null>(null)
  // const [lastValidHotendTemp, setLastValidHotendTemp] = useState<number | null>(null)

  useEffect(() => {
    if (temperatures) {
      const [bedTemp, hotendTemp] = validTemperatures

      const newDataPoint: TemperatureData = {
        time: new Date().toLocaleTimeString(),
        bedTemp: bedTemp ?? 0,
        hotendTemp: hotendTemp ?? 0,
      }

      setData((prevData) => [...prevData, newDataPoint].slice(-50))
    }
  }, [validTemperatures])

  const option = {
    backgroundColor: '#333',
    title: {
      text: t('chart.title'),
      textStyle: {
        color: '#fff',
      },
      top: 10,
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: '#fff',
      },
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
    },
    legend: {
      data: [t('chart.bed'), t('chart.hotend')],
      top: 10,
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((point) => point.time),
      axisLine: {
        lineStyle: {
          color: '#888',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
        color: '#fff',
      },
      axisLine: {
        lineStyle: {
          color: '#888',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: t('chart.bed'),
        type: 'line',
        data: data.map((point) => point.bedTemp),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'indigo',
        },
      },
      {
        name: t('chart.hotend'),
        type: 'line',
        data: data.map((point) => point.hotendTemp),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'red',
        },
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 300 }} />
}

export default TemperatureChart
