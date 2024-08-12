import { type FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ApiProvider } from '@/context/ApiContext'

interface ProtectedRouteProps {
  element: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <ApiProvider>{element}</ApiProvider> : <Navigate to="/login" />
}
