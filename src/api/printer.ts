// src/api/printer.ts
import client from './octoprintClient';

export const getPrinterState = async () => {
  try {
    const response = await client.get('/printer');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el estado de la impresora:', error);
    throw error;
  }
};

export const setToolTemperature = async (temperature: number) => {
  try {
    const response = await client.post('/printer/tool', {
      command: 'target',
      targets: { tool0: temperature },
    });
    return response.data;
  } catch (error) {
    console.error('Error al establecer la temperatura del extrusor:', error);
    throw error;
  }
};

export const setBedTemperature = async (temperature: number) => {
  try {
    const response = await client.post('/printer/bed', {
      command: 'target',
      target: temperature,
    });
    return response.data;
  } catch (error) {
    console.error('Error al establecer la temperatura de la cama:', error);
    throw error;
  }
};
