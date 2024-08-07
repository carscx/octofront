import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/Home.page'
import LoginPage from '@/pages/Login.page'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
