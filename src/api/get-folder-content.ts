import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface GetFolderContentResponse extends ApiResponse {
  data?: {
    folders: {
      id: number
      title: string
    }[]
  }
}

export async function getFolderContent(
  token: string,
  projectId: number
): Promise<GetFolderContentResponse> {
  try {
    const response = await api.get(`/projects/${projectId}/content`, {
      headers: {
        Authorization: token,
      },
    })

    return {
      data: response.data,
    }
  } catch (error) {
    return {
      error: getResponseError(error),
    }
  }
}
