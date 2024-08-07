/* eslint-disable no-alert */
import React, { useState } from 'react'
import { Button } from '@mantine/core'
import { setToolTemperature, setBedTemperature } from '@/api/octoprint'

const TemperatureControl: React.FC = () => {
  const [toolTemp, setToolTemp] = useState<number>(0)
  const [bedTemp, setBedTemp] = useState<number>(0)

  const handleToolTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolTemp(Number(e.target.value))
  }

  const handleBedTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedTemp(Number(e.target.value))
  }

  const handleSetToolTemp = async () => {
    try {
      await setToolTemperature(toolTemp)
      alert('Temperatura del extrusor establecida correctamente')
    } catch (error) {
      alert('Error al establecer la temperatura del extrusor')
    }
  }

  const handleSetBedTemp = async () => {
    try {
      await setBedTemperature(bedTemp)
      alert('Temperatura de la cama establecida correctamente')
    } catch (error) {
      alert('Error al establecer la temperatura de la cama')
    }
  }

  return (
    <div>
      <h1>Control de Temperatura</h1>
      <div>
        <label>
          Temperatura del Extrusor:
          <input type="number" value={toolTemp} onChange={handleToolTempChange} />
        </label>
        <Button onClick={handleSetToolTemp}>Establecer</Button>
      </div>
      <div>
        <label>
          Temperatura de la Cama:
          <input type="number" value={bedTemp} onChange={handleBedTempChange} />
        </label>
        <Button onClick={handleSetBedTemp}>Establecer</Button>
      </div>
    </div>
  )
}

export default TemperatureControl
