import { type FC } from 'react'
import { Alert, Text } from '@mantine/core'
import AnimatedHourglass from './AnimatedHourGlass'

interface InfoCardProps {
  label: string
  value: string
  isPrinting: boolean
}

const InfoCard: FC<InfoCardProps> = ({ label, value, isPrinting }) => (
  <Alert
    icon={<AnimatedHourglass isPrinting={isPrinting} />}
    radius="md"
    p="md"
    style={{ width: '100%', textAlign: 'center', height: '100%' }}
  >
    <Text fw={700}>{label}</Text>
    <Text>{value}</Text>
  </Alert>
)

export default InfoCard
