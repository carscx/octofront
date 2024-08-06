import React, { useEffect, useState } from 'react';
import { IconTemperature } from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import { getPrinterState } from '@/api/octoprint';

const PrinterStatus: React.FC = () => {
  const [printerState, setPrinterState] = useState<any>(null);

  useEffect(() => {
    const fetchPrinterState = async () => {
      try {
        const state = await getPrinterState();
        setPrinterState(state);
      } catch (error) {
        console.error('Error al obtener el estado de la impresora:', error);
      }
    };

    fetchPrinterState(); // Llamada inicial

    const intervalId = setInterval(fetchPrinterState, 5000); // Intervalo de 1 segundo

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, []);

  if (!printerState) {
    return <div>Cargando...</div>;
  }

  const icon = <IconTemperature style={{ width: 'rem(12)', height: 'rem(12)' }} />;

  return (
    <div>
      <h1>Estado de la Impresora</h1>
      <p>
        Temperatura de la cama:{' '}
        <Badge size="xl" leftSection={icon}>
          {printerState?.temperature?.bed?.actual}
        </Badge>
      </p>
      <p>
        Temperatura del hotend:{' '}
        <Badge size="xl" leftSection={icon}>
          {printerState?.temperature?.tool0?.actual}
        </Badge>
      </p>
    </div>
  );
};

export default PrinterStatus;
