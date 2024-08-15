import { useEffect, type FC } from 'react'
import { Alert, Box, Button, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
// import { usePrinterContext } from '@/context/PrinterContext'
// import TemperatureChart from '@/components/TemperatureChart/TemperatureChart'
import JobStatus from './JobStatus'
// import ProgressDisplay from './ProgressDisplay'
import TemperatureGrid from './TemperatureGrid'
// import { IconInfoCircle } from '@tabler/icons-react'
import { usePrinterWebSocket } from '@/hooks/usePrinterWebSocket'
import ProgressDisplay from './ProgressDisplay'
import TemperatureChart from '../TemperatureChart/TemperatureChart'

const PrinterStatus: FC = () => {
  // const {
  //   printerState,
  //   jobState,
  // hasPrinterError,
  // hasJobError,
  // stopPrinterInterval,
  // stopJobInterval,
  // retryPrinter,
  // retryJob,
  // printerLoading,
  // jobLoading,
  // } = usePrinterContext()

  const {
    printerStateData,
    printerStatusMsg,
    error: errorWs,
    loading: loadingWs,
    retryConnection: retryConnectionWs,
  } = usePrinterWebSocket()

  const { t } = useTranslation('printerStatus')

  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  const handleRetry = () => {
    // retryPrinter()
    // retryJob()
    console.log('retry')
  }

  // useEffect(() => {
  //   if (hasPrinterError) {
  //     stopPrinterInterval()
  //   }
  //   if (hasJobError) {
  //     stopJobInterval()
  //   }
  // }, [hasPrinterError, hasJobError, stopPrinterInterval, stopJobInterval])

  // const icon = <IconInfoCircle />

  // if (hasPrinterError || hasJobError) {
  //   return (
  //     <Alert variant="light" color="red" title={t('errorOcurred')} icon={icon}>
  //       <Button
  //         onClick={handleRetry}
  //         disabled={printerLoading || jobLoading}
  //         loading={printerLoading || jobLoading}
  //       >
  //         {t('retry')}
  //       </Button>
  //     </Alert>
  //   )
  // }

  // if (!printerState || !jobState) {
  //   return <div>{t('loading')}</div>
  // }

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
          {t('title')}

          <JobStatus state={printerStatusMsg ?? '-'} />
        </h1>
      </Box>

      <TemperatureGrid temperatures={temperatures} />
      <Space h="xl" />
      <ProgressDisplay />
      <Space h="xl" />
      <TemperatureChart temperatures={temperatures} />
    </div>
  )
}

export default PrinterStatus
