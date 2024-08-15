import { type FC } from 'react'
import { usePrinterWebSocket } from '@/hooks/usePrinterWebSocket'

const PrinterStatusWs: FC = () => {
  const { printerStateData, error, loading, retryConnection } = usePrinterWebSocket()

  if (loading) {
    return <div>Cargando estado de la impresora...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={retryConnection}>Reintentar Conexión</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Estado de la impresora: {printerStateData?.state.text}</h2>
      <div>
        <h3>Temperaturas:</h3>
        <p>
          Extrusor: {printerStateData?.temps.tool0.actual}°C /{' '}
          {printerStateData?.temps.tool0.target}°C
        </p>
        <p>
          Cama: {printerStateData?.temps.bed.actual}°C / {printerStateData?.temps.bed.target}°C
        </p>
      </div>
    </div>
  )
}

export default PrinterStatusWs
