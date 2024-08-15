import { type FC } from 'react'
import { Box, Grid, Progress, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { IconFileAnalytics } from '@tabler/icons-react'
import { formatTime, formatSize, formatDate } from '@/utils/helpers'
import { usePrinterWebSocket } from '@/hooks/usePrinterWebSocket'
import InfoCard from '@/components/PrinterStatus/InfoCard'
import styles from '@/components/PrinterStatus/PrinterStatus.module.scss'

const ProgressDisplay: FC = () => {
  const { t } = useTranslation('printerStatus')
  const { progressState, fileState, isPrinting } = usePrinterWebSocket()
  const printTime = progressState?.printTime ?? 0
  const printTimeLeft = progressState?.printTimeLeft ?? 0
  const filePos = progressState?.filepos ?? 0
  const fileSize = fileState?.size ?? 0
  const fileName = fileState?.name ?? ''
  const isPrintingState = isPrinting ?? false
  const completionPercentage =
    printTime + printTimeLeft > 0 ? (printTime / (printTime + printTimeLeft)) * 100 : 0
  const estimatedCompletionTime = new Date(Date.now() + printTimeLeft * 1000)

  return (
    <>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('printTime')}
            value={formatTime(printTime)}
            isPrinting={isPrintingState}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('printTimeLeft')}
            value={formatTime(printTimeLeft)}
            isPrinting={isPrintingState}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('estimatedCompletionTime')}
            value={formatDate(estimatedCompletionTime)}
            isPrinting={isPrintingState}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('file')}
            icon={<IconFileAnalytics />}
            value={`${formatSize(filePos)} / ${formatSize(fileSize)}`}
            isPrinting={isPrintingState}
          >
            <Text>{fileName}</Text>
          </InfoCard>
        </Grid.Col>
      </Grid>

      <Box mt="md" style={{ width: '100%' }}>
        <Text>{t('printProgress')}:</Text>
        <Box className={styles.progressBox} my="xs">
          <Progress.Root
            transitionDuration={200}
            className={styles.root}
            size="xl"
            style={{ width: '100%' }}
          >
            <Progress.Section value={completionPercentage} className={styles.section}>
              <Progress.Label className={styles.label}>
                {`${completionPercentage.toFixed(2)}%`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Box>
      </Box>
    </>
  )
}

export default ProgressDisplay
