import { useApi } from '@/hooks/useApi'
import { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'

interface User {
  id: number
  name: string
  email: string
}

interface SignInResponseProps {
  success: boolean
  user?: User
  error: string | null
}

interface AuthContextProps {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<SignInResponseProps>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(function () {
    const { 'testlab.user': user } = parseCookies()

    if (!user) return null
    return JSON.parse(user) as User
  })

  const isAuthenticated = user !== null
  const api = useApi()

  useEffect(() => {
    const { 'testlab.token': token } = parseCookies()

    setToken(token !== '' ? token : null)

    if (token && !user) {
      api
        .recoverUserInfo(token)
        .then((response) => {
          const user = response.data as User
          setUser(user)
          setCookie(null, 'testlab.user', JSON.stringify(user), {
            maxAge: 60 * 60 * 24, // 1 day
          })
        })
        .catch(() => {
          setUser(null)
        })
    }
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const response = await api.login(email, password)
      const user = response.data.user as User
      const token = response.data.token as string

      setCookie(null, 'testlab.token', token, {
        maxAge: 60 * 60 * 24, // 1 day
      })

      setCookie(null, 'testlab.user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24, // 1 day
      })

      setUser(user)

      return {
        success: true,
        user: user,
        error: null,
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message as string
        return {
          success: false,
          error: message,
        }
      }

      return {
        success: false,
        error: 'Ocorreu um erro. Por favor, tente novamente mais tarde!',
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
