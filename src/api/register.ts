import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse extends ApiResponse {
  data?: {
    id: number
    name: string
    email: string
  }
}

export async function register({
  name,
  email,
  password
}: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await api.post('/users/new', { name, email, password })

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
