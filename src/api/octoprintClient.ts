// src/api/octoprintClient.ts
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.19/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': '84BDAE14D4634994A44AE111E9AF550A', // Reemplaza con tu clave API de OctoPrint
  },
});

export default client;
