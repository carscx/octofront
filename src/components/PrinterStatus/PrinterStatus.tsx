import { type FC } from 'react'
import { Alert, Box, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { IconInfoCircle } from '@tabler/icons-react'
import { usePrinterWebSocket } from '@/hooks/usePrinterWebSocket'
import { JobStatus, TemperatureGrid, ProgressDisplay } from '@/components/PrinterStatus'
import TemperatureChart from '@/components/TemperatureChart'

const PrinterStatus: FC = () => {
  const {
    printerStateData,
    printerStatusMsg,
    error: errorWs,
    loading: loadingWs,
  } = usePrinterWebSocket()

  const { t } = useTranslation('printerStatus')

  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  if (errorWs) {
    return (
      <Alert
        variant="light"
        color="red"
        title={`${t('errorOcurred')} ${errorWs}`}
        icon={<IconInfoCircle />}
      />
    )
  }

  if (loadingWs) {
    return <div>{t('loading')}</div>
  }

  const temperatures = [
    {
      title: t('bedTemperature'),
      temperature: printerStateData?.temps?.bed?.actual,
      minTemp: 20,
      maxTemp: 60,
    },
    {
      title: t('hotendTemperature'),
      temperature: printerStateData?.temps?.tool0?.actual,
      minTemp: 22,
      maxTemp: 200,
    },
  ]

  return (
    <>
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
          {t('title')}
          <JobStatus state={printerStatusMsg ?? '-'} />
        </h1>
      </Box>
      <Box mt="xl">
        <TemperatureGrid temperatures={temperatures} />
        <Space h="xl" />
        <ProgressDisplay />
        <Space h="xl" />
        <TemperatureChart temperatures={temperatures} />
      </Box>
    </>
  )
}

export default PrinterStatus
