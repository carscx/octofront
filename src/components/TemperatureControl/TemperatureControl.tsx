import { type FC, useCallback, useState } from 'react'
import { Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { usePrinterContext } from '@/context/PrinterContext'
import { notifications } from '@mantine/notifications'
import classes from './TemperatureControl.module.scss'

const TemperatureControl: FC = () => {
  const [toolTemp, setToolTemp] = useState<number>(0)
  const [bedTemp, setBedTemp] = useState<number>(0)
  const { t } = useTranslation('printerStatus')

  const { setToolTemperature, setBedTemperature } = usePrinterContext()

  const handleToolTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolTemp(Number(e.target.value))
  }

  const handleBedTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedTemp(Number(e.target.value))
  }

  const notificationOk = useCallback(
    (temp: number) => {
      notifications.show({
        title: t('notificationTempSetTitleOk'),
        message: t('notificationTempSetMessageOk', {
          toolTemp: temp,
        }),
        classNames: classes,
        position: 'top-right',
      })
    },
    [toolTemp]
  )

  const notificationError = useCallback(() => {
    notifications.show({
      title: t('notificationTempSetTitleError'),
      color: 'red',
      message: t('notificationTempSetMessageError'),
      classNames: classes,
      position: 'top-right',
    })
  }, [])

  const handleSetToolTemp = async () => {
    try {
      await setToolTemperature(toolTemp)
      notificationOk(toolTemp)
    } catch (error) {
      notificationError()
    }
  }

  const handleSetBedTemp = async () => {
    try {
      await setBedTemperature(bedTemp)
      notificationOk(bedTemp)
    } catch (error) {
      notificationError()
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
