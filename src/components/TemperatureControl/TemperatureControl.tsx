import { type FC, useState } from 'react'
import { Button } from '@mantine/core'
import { usePrinterContext } from '@/context/PrinterContext'
import { notifications } from '@mantine/notifications'
import classes from './TemperatureControl.module.scss'

const TemperatureControl: FC = () => {
  const [toolTemp, setToolTemp] = useState<number>(0)
  const [bedTemp, setBedTemp] = useState<number>(0)

  const { setToolTemperature, setBedTemperature } = usePrinterContext()

  const handleToolTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolTemp(Number(e.target.value))
  }

  const handleBedTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedTemp(Number(e.target.value))
  }

  const handleSetToolTemp = async () => {
    try {
      await setToolTemperature(toolTemp)
      notifications.show({
        title: 'Temperatura del extrusor establecida correctamente',
        message: `La temperatura del extrusor se ha establecido en ${toolTemp}°C`,
        classNames: classes,
        position: 'top-right',
      })
    } catch (error) {
      notifications.show({
        title: 'Error al establecer la temperatura del extrusor',
        color: 'red',
        message: 'Ha ocurrido un error al establecer la temperatura del extrusor',
        classNames: classes,
        position: 'top-right',
      })
    }
  }

  const handleSetBedTemp = async () => {
    try {
      await setBedTemperature(bedTemp)
      notifications.show({
        title: 'Temperatura de la cama establecida correctamente',
        message: `La temperatura de la cama se ha establecido en ${bedTemp}°C`,
        classNames: classes,
        position: 'top-right',
      })
    } catch (error) {
      alert('Error al establecer la temperatura de la cama')
      notifications.show({
        title: 'Error al establecer la temperatura de la cama',
        color: 'red',
        message: 'Ha ocurrido un error al establecer la temperatura de la cama',
        classNames: classes,
        position: 'top-right',
      })
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
