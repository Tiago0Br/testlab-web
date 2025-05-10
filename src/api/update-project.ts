import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface UpdateProjectRequest {
  id: number
  name: string
  description: string
}

interface UpdateProjectResponse extends ApiResponse {
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

export async function updateProject({
  id,
  name,
  description
}: UpdateProjectRequest): Promise<UpdateProjectResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.put(
      `/projects/${id}`,
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
