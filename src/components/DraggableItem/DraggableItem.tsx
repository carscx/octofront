import { FC, ReactNode, useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { IconGripVertical } from '@tabler/icons-react'
import { Box } from '@mantine/core'

interface DraggableItemProps {
  id: string
  index: number
  moveComponent: (dragIndex: number, hoverIndex: number) => void
  children: ReactNode
}

const DraggableItem: FC<DraggableItemProps> = ({ id, index, moveComponent, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: 'component',
    hover: (item: any, monitor: DropTargetMonitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveComponent(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <Box
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        marginBottom: '8px',
        backgroundColor: 'transparent',
        boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
      }}
    >
      <IconGripVertical size={24} style={{ marginRight: '8px', color: '#888' }} />
      <div style={{ flex: 1 }}>{children}</div>
    </Box>
  )
}

export default DraggableItem
