import axios from 'axios'
import config from '@/config'

const { baseUrl, apiKey } = config.api

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  },
})
