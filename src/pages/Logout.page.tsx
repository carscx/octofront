import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const LogoutPage: FC = () => {
  const { logout } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate('/login')
  }, [])

  return <p>Logout...</p>
}

export default LogoutPage
