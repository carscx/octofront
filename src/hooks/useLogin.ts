import { useState } from 'react'
import axios from 'axios'
import config from '@/config'

interface LoginResponse {
  session: string
}

interface UseLoginResult {
  login: (username: string, password: string) => Promise<LoginResponse>
  loading: boolean
  error: string | null
}

export const useLogin = (): UseLoginResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post<LoginResponse>(`${config.api.baseUrl}/login`, {
        user: username,
        pass: password,
      })

      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
