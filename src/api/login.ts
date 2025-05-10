import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface User {
  id: number
  name: string
  email: string
}

interface LoginResponse extends ApiResponse {
  data?: {
    user: User
    token: string
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post('/login', { email, password })

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
