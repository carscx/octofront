import { type FC } from 'react'
import { Box, Grid, Progress, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import styles from './PrinterStatus.module.scss'
import { formatTime, formatSize, formatDate } from '@/utils/helpers'
import InfoCard from './InfoCard'
import { IconFileAnalytics } from '@tabler/icons-react'

interface ProgressDisplayProps {
  printTime: number
  printTimeLeft: number
  filePos: number
  fileSize: number
  fileName: number
  isPrinting: boolean // Nueva propiedad para determinar si la impresora está imprimiendo
}

const ProgressDisplay: FC<ProgressDisplayProps> = ({
  printTime,
  printTimeLeft,
  filePos,
  fileSize,
  fileName,
  isPrinting,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'PrinterStatus' })
  const completionPercentage =
    printTime + printTimeLeft > 0 ? (printTime / (printTime + printTimeLeft)) * 100 : 0
  const estimatedCompletionTime = new Date(Date.now() + printTimeLeft * 1000)

  return (
    <>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard label={t('printTime')} value={formatTime(printTime)} isPrinting={isPrinting} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('printTimeLeft')}
            value={formatTime(printTimeLeft)}
            isPrinting={isPrinting}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('estimatedCompletionTime')}
            value={formatDate(estimatedCompletionTime)}
            isPrinting={isPrinting}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            label={t('file')}
            icon={<IconFileAnalytics />}
            value={`${formatSize(filePos)} / ${formatSize(fileSize)}`}
            isPrinting={isPrinting}
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
