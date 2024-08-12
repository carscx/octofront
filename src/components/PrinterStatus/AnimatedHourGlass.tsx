import { type FC, useState, useEffect } from 'react'
import {
  IconHourglass,
  IconHourglassHigh,
  IconHourglassLow,
  IconHourglassEmpty,
  IconHourglassOff,
} from '@tabler/icons-react'

interface AnimatedHourglassProps {
  isPrinting: boolean
}

const AnimatedHourglass: FC<AnimatedHourglassProps> = ({ isPrinting }) => {
  const [currentIcon, setCurrentIcon] = useState<JSX.Element>(<IconHourglass />)

  useEffect(() => {
    if (!isPrinting) {
      setCurrentIcon(<IconHourglassOff />)
      return
    }

    const icons = [
      <IconHourglassHigh key="high" />,
      <IconHourglass key="mid" />,
      <IconHourglassLow key="low" />,
      <IconHourglassEmpty key="empty" />,
    ]

    let index = 0
    const intervalId = setInterval(() => {
      setCurrentIcon(icons[index])
      index = (index + 1) % icons.length
    }, 500) // Cambia cada medio segundo

    return () => clearInterval(intervalId)
  }, [isPrinting])

  return <div>{currentIcon}</div>
}

export default AnimatedHourglass
