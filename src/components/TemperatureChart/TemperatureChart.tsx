// src/components/TemperatureChart.tsx
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

interface TemperatureData {
  time: string
  bedTemp: number
  hotendTemp: number
}

const TemperatureChart: React.FC<{ printerState: any }> = ({ printerState }) => {
  const [data, setData] = useState<TemperatureData[]>([])

  useEffect(() => {
    if (printerState) {
      const newDataPoint: TemperatureData = {
        time: new Date().toLocaleTimeString(),
        bedTemp: printerState.temperature.bed.actual,
        hotendTemp: printerState.temperature.tool0.actual,
      }
      setData((prevData) => [...prevData, newDataPoint].slice(-50)) // Limitar a los últimos 50 puntos de datos
    }
  }, [printerState])

  const option = {
    backgroundColor: '#333', // Fondo oscuro
    title: {
      text: 'Temperatura de la Impresora',
      textStyle: {
        color: '#fff', // Color del texto del título
      },
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: '#fff', // Color del texto del tooltip
      },
      backgroundColor: 'rgba(50, 50, 50, 0.7)', // Fondo del tooltip
    },
    legend: {
      data: ['Bed Temperature', 'Hotend Temperature'],
      textStyle: {
        color: '#fff', // Color del texto de la leyenda
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((point) => point.time),
      axisLine: {
        lineStyle: {
          color: '#888', // Color de la línea del eje X
        },
      },
      axisTick: {
        show: false, // Ocultar las marcas de las unidades del eje X
      },
      axisLabel: {
        color: '#fff', // Color de las etiquetas del eje X
      },
      splitLine: {
        show: false, // Ocultar las líneas de la cuadrícula vertical
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
        color: '#fff', // Color de las etiquetas del eje Y
      },
      axisLine: {
        lineStyle: {
          color: '#888', // Color de la línea del eje Y
        },
      },
      axisTick: {
        show: false, // Ocultar las marcas de las unidades del eje Y
      },
      splitLine: {
        show: false, // Ocultar las líneas de la cuadrícula horizontal
      },
    },
    series: [
      {
        name: 'Bed Temperature',
        type: 'line',
        data: data.map((point) => point.bedTemp),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'indigo',
        },
      },
      {
        name: 'Hotend Temperature',
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
