import { useState, useEffect, useRef } from 'react'
import { apiClient } from '@/api/apiClient'

export const usePrinterState = () => {
  const [printerState, setPrinterState] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorCount, setErrorCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [hasError, setHasError] = useState(false)

  const fetchPrinterState = async () => {
    try {
      const response = await apiClient.get('printer')
      setPrinterState(response.data)
      setError(null)
      setErrorCount(0)
      setHasError(false)
      setLoading(false)
    } catch (err) {
      console.error('Error al obtener el estado de la impresora:', err)
      setError('Error al obtener el estado de la impresora')
      setErrorCount((prevCount) => prevCount + 1)
      setHasError(true)
      if (errorCount >= 2) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (errorCount < 3) {
      setLoading(true)
      intervalIdRef.current = setInterval(fetchPrinterState, 5000)
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [errorCount])

  const stopInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
  }

  const retry = () => {
    setErrorCount(0)
    setHasError(false)
    setLoading(true) // Activamos el loading al comenzar el reintento
    fetchPrinterState() // Llamada inicial inmediata
    intervalIdRef.current = setInterval(fetchPrinterState, 5000)
  }

  return { printerState, error, stopInterval, hasError, retry, loading }
}
