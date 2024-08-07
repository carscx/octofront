import { type FC } from 'react'
import config from '@/config'

const WebcamStream: FC = () => {
  const { webcamUrl } = config.api

  return (
    <>
      <h1>Webcam Stream</h1>
      <img src={webcamUrl} alt="Webcam Stream" style={{ width: '100%' }} />
    </>
  )
}

export default WebcamStream
