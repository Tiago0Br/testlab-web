import { useApi } from '@/hooks/useApi'
import { AxiosError } from 'axios'
import { ReactNode, createContext, useState } from 'react'
import { setCookie } from 'nookies'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextProps {
  user: User | null,
  isAuthenticated: boolean,
  signIn: (email: string, password: string) => Promise<{ success: boolean, error: string | null}>,
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = user !== null
  const api = useApi()

  async function signIn(email: string, password: string) {
    try {
      const response = await api.login(email, password)
      const user = response.data.user as User
      const token = response.data.token as string

      setUser(user)

      setCookie(null, 'testlab.token', token, {
        maxAge: 60 * 60 * 24, // 1 day
      })

      return {
        success: true,
        error: null
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message as string
        return {
          success: false,
          error: message
        }
      }

      return {
        success: false,
        error: 'Ocorreu um erro. Por favor, tente novamente mais tarde!'
      }
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}
