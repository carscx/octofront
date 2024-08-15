import { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, username: string, remember: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))

  const login = (token: string, username: string, remember: boolean) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('remember', remember ? 'true' : 'false')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('remember')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
