import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.19/',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': '84BDAE14D4634994A44AE111E9AF550A', // Reemplaza con tu clave API
  },
});

export const getPrinterState = async () => {
  try {
    const response = await apiClient.get('api/printer');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el estado de la impresora:', error);
    throw error;
  }
};
