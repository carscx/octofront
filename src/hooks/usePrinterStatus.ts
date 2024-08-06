// src/hooks/usePrinterStatus.ts
import { useEffect, useState } from 'react';

const usePrinterStatus = () => {
  const [printerState, setPrinterState] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.19/sockjs/websocket');

    ws.onopen = () => {
      console.log('Conectado al WebSocket de OctoPrint');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.current) {
        setPrinterState(data.current);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Desconectado del WebSocket de OctoPrint');
    };

    return () => {
      ws.close();
    };
  }, []);

  return printerState;
};

export default usePrinterStatus;
