import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

export interface ProjectContent {
  folders: {
    id: number
    title: string
  }[]
}

interface GetProjectContentResponse extends ApiResponse {
  data?: ProjectContent
}

export async function getProjectContent(
  projectId: number
): Promise<GetProjectContentResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.get(`/projects/${projectId}/content`, {
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
