import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/Login.page'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import LogoutPage from './pages/Logout.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
