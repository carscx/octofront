import { type FC } from 'react'
import { Alert, Text } from '@mantine/core'
import AnimatedHourglass from './AnimatedHourGlass'

interface InfoCardProps {
  label: string
  value: string
  isPrinting: boolean
  children?: React.ReactNode
  icon?: React.ReactNode
}

const InfoCard: FC<InfoCardProps> = ({
  label,
  value,
  isPrinting,
  children,
  icon = <AnimatedHourglass isPrinting={isPrinting} />,
}) => (
  <Alert
    icon={icon}
    radius="md"
    p="md"
    style={{ width: '100%', textAlign: 'center', height: '100%' }}
  >
    <Text fw={700}>{label}</Text>
    <Text>{value}</Text>
    {children}
  </Alert>
)

export default InfoCard
