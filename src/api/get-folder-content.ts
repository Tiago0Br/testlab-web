import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

export interface TestCase {
  id: number
  title: string
  summary: string
  status: {
    id: number
    description: string
    note?: string
    created_at: string
  }
}

export interface FolderContent {
  folders: {
    id: number
    title: string
  }[]
  test_cases: TestCase[]
}

interface GetFolderContentResponse extends ApiResponse {
  data?: FolderContent
}

export async function getFolderContent(
  folderId: number
): Promise<GetFolderContentResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.get(`/folders/${folderId}/content`, {
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
