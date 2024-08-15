import { useState, useCallback } from 'react'
import { apiClient } from '@/api/apiClient'
import { notifications } from '@mantine/notifications'

export interface ToolData {
  [key: string]: {
    actual: number
    offset: number
    target: number
  }
}

export const useTool = () => {
  const [error, setError] = useState<string | null>(null)
  const [dataTool, setDataTool] = useState<ToolData | null>(null)

  const setToolTemperature = async (temperature: number) => {
    try {
      const response = await apiClient.post('printer/tool', {
        command: 'target',
        targets: { tool0: temperature },
      })
      return response.data
    } catch (err) {
      console.error('Error al establecer la temperatura del extrusor:', err)
      setError('Error al establecer la temperatura del extrusor')
      throw err
    }
  }

  const getToolStatus = useCallback(async () => {
    try {
      const response = await apiClient.get('printer/tool')
      setDataTool(response.data)
      return dataTool
    } catch (err) {
      console.error('Error al obtener el estado del extrusor:', err)
      setError('Error al obtener el estado del extrusor')
      throw err
    }
  }, [])

  const moveFilament = async (amount: number) => {
    try {
      const response = await apiClient.post('printer/tool', {
        command: 'extrude',
        amount: amount,
      })
      notifications.show({
        title: 'Filamento movido correctamente',
        message: `Se ha movido ${amount}mm de filamento`,
        position: 'top-right',
      })
      return response.data
    } catch (err) {
      console.error('Error al mover filamento:', err)
      setError('Error al mover filamento')
      throw err
    }
  }

  return { setToolTemperature, getToolStatus, moveFilament, dataTool, error }
}
