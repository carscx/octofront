import { FC, useEffect, useState } from 'react'
import config from '@/config'

const WSOctoprint: FC = () => {
  const [temperatureData, setTemperatureData] = useState<any>(null)
  const [progressData, setProgressData] = useState<any>(null)
  const [printerState, setPrinterState] = useState<any>(null)
  const [versionState, setVersionState] = useState<any>(null)

  useEffect(() => {
    const API_KEY = config.api.apiKey // Clave de API generada manualmente
    const socket = new WebSocket(`${config.api.websocketUrl}/sockjs/websocket?apikey=${API_KEY}`)

    socket.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('Mensaje recibido:', message)
      if (message.connected.display_version) {
        setVersionState(message.connected.display_version)
      }
      if (message.current) {
        if (message.current.temps) {
          setTemperatureData(message.current.temps)
        }
        if (message.current.progress) {
          setProgressData(message.current.progress)
        }
      }

      if (message.state) {
        setPrinterState(message.state)
      }
    }

    socket.onclose = () => {
      console.log('WebSocket disconnected')
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div>
      <h1>Datos en tiempo real v{versionState}</h1>
      <h2>Temperaturas</h2>
      {temperatureData ? (
        <pre>{JSON.stringify(temperatureData, null, 2)}</pre>
      ) : (
        <p>No hay datos de temperatura disponibles</p>
      )}
      <h2>Progreso de impresión</h2>
      {progressData ? (
        <pre>{JSON.stringify(progressData, null, 2)}</pre>
      ) : (
        <p>No hay datos de progreso disponibles</p>
      )}
      <h2>Estado de la Impresora</h2>
      {printerState ? (
        <pre>{JSON.stringify(printerState, null, 2)}</pre>
      ) : (
        <p>No hay datos de estado de la impresora disponibles</p>
      )}
    </div>
  )
}

export default WSOctoprint
