import { type FC, useState } from 'react'
import config from '@/config'
import { useTranslation } from 'react-i18next'
import { Alert } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

const WebcamStream: FC = () => {
  const { t } = useTranslation('webcamStream')
  const { webcamUrl } = config.api
  const [error, setError] = useState<string | null>(null)

  const handleError = () => {
    setError(t('error'))
  }

  return (
    <>
      <h1>{t('title')}</h1>
      {error ? (
        <Alert variant="light" color="red" title={error} icon={<IconInfoCircle />} />
      ) : (
        <img src={webcamUrl} alt={t('title')} style={{ width: '100%' }} onError={handleError} />
      )}
    </>
  )
}

export default WebcamStream
