import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

export interface ParentFolder {
  id: number
  title: string
}

export interface Folder {
  id: number
  title: string
  project: {
    id: number
    name: string
    description: string
  }
  parent_folder?: ParentFolder
}

interface GetFolderByIdResponse extends ApiResponse {
  data?: Folder
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
