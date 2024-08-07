/* eslint-disable no-console */
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

export const getPrinterState = async () => {
  try {
    const response = await apiClient.get('printer')
    return response.data
  } catch (error) {
    console.error('OctoPrint.ts: Error al obtener el estado de la impresora:', error)
    throw error
  }
}

export const getJobState = async () => {
  try {
    const response = await apiClient.get('job')
    return response.data
  } catch (error) {
    console.error('OctoPrint.ts: Error al obtener el job de la impresora:', error)
    throw error
  }
}

export const setToolTemperature = async (temperature: number) => {
  try {
    const response = await apiClient.post('printer/tool', {
      command: 'target',
      targets: { tool0: temperature },
    })
    return response.data
  } catch (error) {
    console.error('Error al establecer la temperatura del extrusor:', error)
    throw error
  }
}

export const setBedTemperature = async (temperature: number) => {
  try {
    const response = await apiClient.post('printer/bed', {
      command: 'target',
      target: temperature,
    })
    return response.data
  } catch (error) {
    console.error('Error al establecer la temperatura de la cama:', error)
    throw error
  }
}
