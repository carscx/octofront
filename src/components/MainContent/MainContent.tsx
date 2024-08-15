import { FC, useState, useEffect } from 'react'
import { Container } from '@mantine/core'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import PrinterStatus from '@/components/PrinterStatus/PrinterStatus'
import WebcamStream from '@/components/WebcamStream/WebcamStream'
import TemperatureControl from '@/components/TemperatureControl'
import ToolExtruder from '@/components/ToolExtruder'
import DraggableItem from '@/components/DraggableItem'

type ComponentId = 'printer-status' | 'webcam-stream' | 'temperature-control' | 'tool-extruder'

const componentMap: Record<ComponentId, FC> = {
  'printer-status': PrinterStatus,
  'webcam-stream': WebcamStream,
  'temperature-control': TemperatureControl,
  'tool-extruder': ToolExtruder,
}

const defaultComponentOrder: { id: ComponentId; Component: FC }[] = [
  { id: 'printer-status', Component: PrinterStatus },
  { id: 'webcam-stream', Component: WebcamStream },
  { id: 'temperature-control', Component: TemperatureControl },
  { id: 'tool-extruder', Component: ToolExtruder },
]

const MainContent: FC = () => {
  const [componentOrder, setComponentOrder] = useState(defaultComponentOrder)

  useEffect(() => {
    const savedOrder = localStorage.getItem('componentOrder')
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder) as ComponentId[]
      const mappedOrder = parsedOrder.map((id) => ({
        id,
        Component: componentMap[id],
      }))
      setComponentOrder(mappedOrder)
    }
  }, [])

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const draggedComponent = componentOrder[dragIndex]
    const newOrder = update(componentOrder, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedComponent],
      ],
    })

    setComponentOrder(newOrder)
    localStorage.setItem('componentOrder', JSON.stringify(newOrder.map((comp) => comp.id)))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container size="lg">
        {componentOrder.map(({ id, Component }, index) => (
          <DraggableItem key={id} id={id} index={index} moveComponent={moveComponent}>
            <Component />
          </DraggableItem>
        ))}
      </Container>
    </DndProvider>
  )
}

export default MainContent
