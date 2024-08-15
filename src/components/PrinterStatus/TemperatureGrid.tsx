import { type FC } from 'react'
import { Grid, Alert, Space, Center, Chip } from '@mantine/core'
import { IconTemperature } from '@tabler/icons-react'
import { useValidTemperature } from '@/hooks/useValidTemperature'

interface TemperatureGridProps {
  temperatures: Array<{
    title: string
    temperature: number | undefined
    minTemp: number
    maxTemp: number
  }>
}

const TemperatureGrid: FC<TemperatureGridProps> = ({ temperatures }) => {
  const validTemperatures = useValidTemperature(temperatures.map((t) => t.temperature))

  const getChipColor = (temperature: number | undefined, minTemp: number, maxTemp: number) => {
    if (temperature === undefined) return 'gray'

    const ratio = (temperature - minTemp) / (maxTemp - minTemp)
    const boundedRatio = Math.min(Math.max(ratio, 0), 1)

    if (boundedRatio < 0.33) return 'blue'
    if (boundedRatio < 0.66) return 'yellow'
    return 'red'
  }

  return (
    <Grid gutter="md">
      {temperatures.map(({ title, temperature, minTemp, maxTemp }, index) => {
        const effectiveTemperature = validTemperatures[index]
        const chipColor = getChipColor(effectiveTemperature, minTemp, maxTemp)

        return (
          <Grid.Col key={title} span={{ base: 12, sm: 6, lg: 6 }}>
            <Alert
              title={title}
              variant="light"
              color={chipColor}
              icon={<IconTemperature />}
              radius="md"
            >
              <Space h="md" />
              <Center>
                <Chip
                  variant="filled"
                  color={chipColor}
                  icon={<IconTemperature style={{ width: '1rem', height: '1rem' }} />}
                  checked
                >
                  {effectiveTemperature}°C
                </Chip>
              </Center>
            </Alert>
          </Grid.Col>
        )
      })}
    </Grid>
  )
}

export default TemperatureGrid
