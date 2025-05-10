import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface CreateFolderRequest {
  title: string
  folder_id?: number
  project_id: number
}

interface CreateFolderResponse extends ApiResponse {
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

export async function createFolder({
  title,
  folder_id,
  project_id
}: CreateFolderRequest): Promise<CreateFolderResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.post(
      `/folders/new`,
      {
        title,
        folder_id: folder_id ?? null,
        project_id,
        is_test_suite: 1
      },
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
