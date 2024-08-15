import config from '@/config'
import { useState, useEffect, useRef } from 'react'
import { PrinterData, PrintFile, PrintJob, PrintProgress } from '@/hooks/types'

export const usePrinterWebSocket = () => {
  const [printerStateData, setPrinterStateData] = useState<PrinterData | null>(null)
  const [printerStatusMsg, setPrinterStatusMsg] = useState<string | null>(null)
  const [isPrinting, setIsPrinting] = useState<boolean | null>(null)
  const [jobState, setJobState] = useState<PrintJob | null>(null)
  const [fileState, setFileState] = useState<PrintFile | null>(null)
  const [progressState, setProgressState] = useState<PrintProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const wsRef = useRef<WebSocket | null>(null)

  const connectWebSocket = () => {
    const session = localStorage.getItem('token')
    const username = 'ender'

    if (!session || !username) {
      setError('No se encontró sesión o nombre de usuario en localStorage')
      setLoading(false)
      return
    }

    const ws = new WebSocket(`${config.websocket.url}/sockjs/websocket`)
    wsRef.current = ws

    ws.onopen = () => {
      setLoading(false)
      setError(null)

      ws.send(
        JSON.stringify({
          auth: `${username}:${session}`,
        })
      )

      ws.send(
        JSON.stringify({
          type: 'subscribe',
          event: {
            state: true,
            temperature: true,
          },
        })
      )
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.current) {
        const { state, temps, job, progress } = message.current
        const latestTemps =
          temps.length > 0
            ? temps[temps.length - 1]
            : { tool0: { actual: 0, target: 0 }, bed: { actual: 0, target: 0 } }
        setIsPrinting(state.flags.printing)
        setFileState(job?.file)
        setProgressState(progress)
        setJobState(job)
        setPrinterStatusMsg(state.text)
        setPrinterStateData({
          state: state.text,
          temps: {
            tool0: latestTemps.tool0,
            bed: latestTemps.bed,
          },
        })
      }
    }

    ws.onerror = (err) => {
      setError('Error en la conexión del WebSocket')
      setLoading(false)
    }

    ws.onclose = () => {
      setError('WebSocket desconectado')
      setLoading(true)
      setTimeout(connectWebSocket, 5000)
    }
  }

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const stopWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }

  const retryConnection = () => {
    setError(null)
    setLoading(true)
    stopWebSocket()
    connectWebSocket()
  }

  return {
    printerStateData,
    printerStatusMsg,
    jobState,
    progressState,
    fileState,
    isPrinting,
    error,
    loading,
    stopWebSocket,
    retryConnection,
  }
}
