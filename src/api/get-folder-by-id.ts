import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
interface GetFolderByIdResponse extends ApiResponse {
  data?: {
    id: number
    title: string
    project: {
      id: number
      name: string
      description: string
    }
    parent_folder?: {
      id: number
      title: string
    }
  }
}

export async function getFolderById(
  token: string,
  folderId: number
): Promise<GetFolderByIdResponse> {
  try {
    const response = await api.get(`/folders/${folderId}`, {
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
