import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface ListTestCaseStatusResponse extends ApiResponse {
  data?: {
    value: string
    label: string
    disabled: boolean
  }[]
}

export async function listTestCaseStatus(
  token: string
): Promise<ListTestCaseStatusResponse> {
  try {
    const response = await api.get('/test_cases/status', {
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
