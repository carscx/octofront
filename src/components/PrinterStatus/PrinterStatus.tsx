import { type FC } from 'react'
import { Box, Space, Text, useMantineTheme } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/context/ApiContext'
import TemperatureChart from '@/components/TemperatureChart/TemperatureChart'
import JobStatus from './JobStatus'
import ProgressDisplay from './ProgressDisplay'
import TemperatureGrid from './TemperatureGrid'
import { useMediaQuery } from '@mantine/hooks'

const PrinterStatus: FC = () => {
  const { printerState, jobState } = useApi()
  const { t } = useTranslation('features', { keyPrefix: 'PrinterStatus' })

  const theme = useMantineTheme()

  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  if (!printerState || !jobState) {
    return <div>{t('loading')}</div>
  }

  const temperatures = [
    {
      title: t('bedTemperature'),
      temperature: printerState?.temperature?.bed?.actual,
      minTemp: 20,
      maxTemp: 60,
    },
    {
      title: t('hotendTemperature'),
      temperature: printerState?.temperature?.tool0?.actual,
      minTemp: 22,
      maxTemp: 200,
    },
  ]

  return (
    <div>
      <Box mt="xl">
        <h1
          style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            gap: isSmallScreen ? '10px' : '20px',
            textAlign: isSmallScreen ? 'center' : 'left',
          }}
        >
          {t('printerStatus')}
          <JobStatus jobState={jobState} />
        </h1>
      </Box>
      <TemperatureGrid temperatures={temperatures} />
      <Space h="xl" />
      <ProgressDisplay
        printTime={jobState?.progress?.printTime ?? 0}
        printTimeLeft={jobState?.progress?.printTimeLeft ?? 0}
        filePos={jobState?.progress?.filepos ?? 0}
        fileSize={jobState?.job?.file?.size ?? 0}
        fileName={jobState?.job?.file?.name ?? ''}
        isPrinting={jobState?.state === 'Printing'}
      />
      <Space h="xl" />
      <TemperatureChart printerState={printerState} />
    </div>
  )
}

export default PrinterStatus
