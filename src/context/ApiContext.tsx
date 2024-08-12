import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import config from '@/config'

const { baseUrl, apiKey } = config.api

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  },
})

interface ApiContextProps {
  printerState: any
  jobState: any
  setToolTemperature: (temperature: number) => Promise<void>
  setBedTemperature: (temperature: number) => Promise<void>
  refreshStates: () => void
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined)

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [printerState, setPrinterState] = useState<any>(null)
  const [jobState, setJobState] = useState<any>(null)

  const fetchPrinterState = async () => {
    try {
      const response = await apiClient.get('printer')
      setPrinterState(response.data)
    } catch (error) {
      console.error('Error al obtener el estado de la impresora:', error)
    }
  }

  const fetchJobState = async () => {
    try {
      const response = await apiClient.get('job')
      setJobState(response.data)
    } catch (error) {
      console.error('Error al obtener el estado del trabajo:', error)
    }
  }

  const setToolTemperature = async (temperature: number) => {
    try {
      await apiClient.post('printer/tool', {
        command: 'target',
        targets: { tool0: temperature },
      })
    } catch (error) {
      console.error('Error al establecer la temperatura del extrusor:', error)
    }
  }

  const setBedTemperature = async (temperature: number) => {
    try {
      await apiClient.post('printer/bed', {
        command: 'target',
        target: temperature,
      })
    } catch (error) {
      console.error('Error al establecer la temperatura de la cama:', error)
    }
  }

  const refreshStates = () => {
    fetchPrinterState()
    fetchJobState()
  }

  useEffect(() => {
    refreshStates()
    const intervalId = setInterval(fetchPrinterState, 5000)
    const intervalJobId = setInterval(fetchJobState, 1000)

    return () => {
      clearInterval(intervalId)
      clearInterval(intervalJobId)
    }
  }, [])

  return (
    <ApiContext.Provider
      value={{ printerState, jobState, setToolTemperature, setBedTemperature, refreshStates }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi debe ser usado dentro de un ApiProvider')
  }
  return context
}
