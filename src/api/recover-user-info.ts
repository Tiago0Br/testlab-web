import { api } from '@/lib/axios'
import { getResponseError } from '@/utils'
import { ApiResponse } from './api-response'

interface RecoverUserInfoResponse extends ApiResponse {
  data?: {
    id: number
    name: string
    email: string
  }
}

export async function recoverUserInfo(
  token: string
): Promise<RecoverUserInfoResponse> {
  try {
    const response = await api.get('/users/info', {
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
