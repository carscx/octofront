import { type FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PrinterProvider } from '@/context/PrinterContext'

interface ProtectedRouteProps {
  element: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <PrinterProvider>{element}</PrinterProvider> : <Navigate to="/login" />
}
