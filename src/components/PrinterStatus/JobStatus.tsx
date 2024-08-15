import { type FC } from 'react'
import { Chip } from '@mantine/core'
import { useTranslation } from 'react-i18next'

interface JobStatusProps {
  state?: string
}

const JobStatus: FC<JobStatusProps> = ({ state }) => {
  const { t } = useTranslation('printerStatus')

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'Operational':
        return 'dark'
      case 'Printing':
        return 'teal'
      case 'Paused':
        return 'yellow'
      case 'Error':
        return 'red'
      case 'Offline':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getStatusText = (state: string) => {
    switch (state) {
      case 'Operational':
        return t('readyToPrint')
      case 'Printing':
        return t('printing')
      case 'Paused':
        return t('paused')
      case 'Error':
        return t('error')
      case 'Offline':
        return t('offline')
      default:
        return t('unknown')
    }
  }

  return (
    <Chip checked color={getStatusColor(state ?? '')}>
      {getStatusText(state ?? '')}
    </Chip>
  )
}

export default JobStatus
