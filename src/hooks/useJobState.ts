import { useState, useEffect, useRef } from 'react'
import { apiClient } from '@/api/apiClient'

export const useJobState = () => {
  const [jobState, setJobState] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorCount, setErrorCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [hasError, setHasError] = useState(false)

  const fetchJobState = async () => {
    try {
      const response = await apiClient.get('job')
      setJobState(response.data)
      setError(null)
      setErrorCount(0)
      setHasError(false)
      setLoading(false) // Detenemos el loading si la llamada es exitosa
    } catch (err) {
      console.error('Error al obtener el job de la impresora:', err)
      setError('Error al obtener el job de la impresora')
      setErrorCount((prevCount) => prevCount + 1)
      setHasError(true)
      if (errorCount >= 2) {
        setLoading(false) // Detenemos el loading después de 3 intentos fallidos
      }
    }
  }

  useEffect(() => {
    if (errorCount < 3) {
      setLoading(true)
      intervalIdRef.current = setInterval(fetchJobState, 1000)
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
    fetchJobState() // Llamada inicial inmediata
    intervalIdRef.current = setInterval(fetchJobState, 1000)
  }

  return { jobState, error, stopInterval, hasError, retry, loading }
}
