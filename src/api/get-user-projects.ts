import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

export interface Project {
  id: number
  name: string
  description: string
}

interface GetUserProjectsResponse extends ApiResponse {
  data?: Project[]
}

export async function getUserProjects(): Promise<GetUserProjectsResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.get('/users/projects', {
      headers: {
        Authorization: token
      }
    })

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
