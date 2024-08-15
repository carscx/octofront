import { type FC, MouseEvent, useEffect, useRef, useState } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  NumberInputHandlers,
  rem,
  Title,
  Tooltip,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useTool } from '@/hooks/useTool'
// import { usePrinterContext } from '@/context/PrinterContext'
import { useValidTemperature } from '@/hooks/useValidTemperature'
import { usePrinterWebSocket } from '@/hooks/usePrinterWebSocket'

interface ToolStatus {
  actual: number
  target: number
  offset: number
}

const extrusionValues = [50, 100, 200]
const retractionValues = [50, 100, 200]

const ToolExtruder: FC = () => {
  const { t } = useTranslation('tool')
  const { dataTool, getToolStatus, moveFilament } = useTool()
  const { tool0 } = dataTool || {}
  const { printerStateData } = usePrinterWebSocket()
  const handlersRef = useRef<NumberInputHandlers>(null)
  const [filamentAmount, setFilamentAmount] = useState<number>(5)

  const validTemperatures = useValidTemperature([
    printerStateData?.temps?.tool0?.actual || 0,
    printerStateData?.temps?.tool0?.target || 0,
  ])

  const isTemperatureInRange = (toolStatus: ToolStatus | undefined, tolerance = 5): boolean => {
    const [tempActual, tempTarget] = validTemperatures
    if (!toolStatus || tempActual === null || tempTarget === null) return false
    return Math.abs((tempActual || 0) - (tempTarget || 0)) <= tolerance
  }

  const isEnableExtrude = !isTemperatureInRange(tool0)
  const labelExtrude = isEnableExtrude ? t('temperatureIsOutOfRange') : t('temperatureIsInRange')

  const handleDecrement = () => {
    setFilamentAmount((current) => Math.max(0, current - 5))
  }

  const handleIncrement = () => {
    setFilamentAmount((current) => Math.min(1000, current + 5))
  }

  const handleMoveFilament = (event: MouseEvent<HTMLButtonElement>, amount: number) => {
    event.preventDefault()
    moveFilament(amount)
  }

  useEffect(() => {
    if (dataTool === null) {
      getToolStatus()
    }
  }, [dataTool, getToolStatus])

  const renderButtonGroup = (title: string, values: number[], isRetract = false) => (
    <>
      <Title order={4} mt="lg">
        {title}
      </Title>
      <Group mt="sm">
        {values.map((value) => (
          <Tooltip
            key={value}
            label={labelExtrude}
            disabled={!isEnableExtrude}
            withArrow
            position="bottom"
          >
            <Button
              variant="light"
              disabled={isEnableExtrude}
              onClick={(event) => handleMoveFilament(event, isRetract ? -value : value)}
            >
              {`${value}mm`}
            </Button>
          </Tooltip>
        ))}
      </Group>
    </>
  )

  return (
    <Box mt="lg">
      <Title>{t('title')}</Title>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <ActionIcon
          onClick={handleDecrement}
          variant="default"
          size="lg"
          aria-label="Minus"
          ml="sm"
        >
          <IconMinus style={{ width: rem(20) }} stroke={1.5} />
        </ActionIcon>
        <NumberInput
          handlersRef={handlersRef}
          step={5}
          min={0}
          max={1000}
          value={filamentAmount}
          stepHoldDelay={500}
          stepHoldInterval={100}
          hideControls
          style={{ width: '100%' }}
        />
        <ActionIcon onClick={handleIncrement} variant="default" size="lg" aria-label="Plus">
          <IconPlus style={{ width: rem(20) }} stroke={1.5} />
        </ActionIcon>
      </Box>
      <Group mt="lg">
        <Tooltip label={labelExtrude}>
          <Button
            variant="filled"
            disabled={isEnableExtrude}
            onClick={(event) => handleMoveFilament(event, filamentAmount)}
          >
            {t('extrude')}
          </Button>
        </Tooltip>
        <Tooltip label={labelExtrude}>
          <Button
            variant="filled"
            disabled={isEnableExtrude}
            onClick={(event) => handleMoveFilament(event, -filamentAmount)}
          >
            {t('retract')}
          </Button>
        </Tooltip>
      </Group>

      {renderButtonGroup(t('extrusionPresetValues'), extrusionValues)}
      {renderButtonGroup(t('retractionPresetValues'), retractionValues, true)}
    </Box>
  )
}

export default ToolExtruder
