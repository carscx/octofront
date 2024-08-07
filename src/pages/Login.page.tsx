// pages/Login.page.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput, Alert } from '@mantine/core'
import { useLogin } from '@/hooks/useLogin'
import { useAuth } from '@/context/AuthContext'

const LoginPage: React.FC = () => {
  const { login: authenticate } = useAuth()
  const { login, loading, error } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await login(username, password)
      authenticate(response.session)
      navigate('/')
    } catch (err) {
      // Manejo del error si es necesario
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
      />
      {error && <Alert color="red">{error}</Alert>}
      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  )
}

export default LoginPage
