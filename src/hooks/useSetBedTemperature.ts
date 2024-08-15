import { useState } from 'react'
import { apiClient } from '@/api/apiClient'

export const useSetBedTemperature = () => {
  const [error, setError] = useState<string | null>(null)

  const setBedTemperature = async (temperature: number) => {
    try {
      const response = await apiClient.post('printer/bed', {
        command: 'target',
        target: temperature,
      })
      return response.data
    } catch (err) {
      console.error('Error al establecer la temperatura de la cama:', err)
      setError('Error al establecer la temperatura de la cama')
      throw err
    }
  }

  return { setBedTemperature, error }
}
