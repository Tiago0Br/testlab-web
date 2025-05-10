import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface CreateProjectRequest {
  name: string
  description: string
}

interface CreateProjectResponse extends ApiResponse {
  data?: {
    id: number
    name: string
    description: string
    owner_user: {
      id: number
      name: string
      email: string
    }
  }
}

export async function createProject({
  name,
  description
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.post(
      '/projects/new',
      { name, description },
      {
        headers: {
          Authorization: token
        }
      }
    )

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
