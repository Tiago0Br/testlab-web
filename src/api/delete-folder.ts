import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface DeleteFolderResponse extends ApiResponse {
  data?: {
    id: number
  }
}

export async function deleteFolder(
  folderId: number
): Promise<DeleteFolderResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.delete(`/folders/${folderId}`, {
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
