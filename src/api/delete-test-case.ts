import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface DeleteTestCaseResponse extends ApiResponse {
  data?: {
    id: number
  }
}

export async function deleteTestCase(
  token: string,
  testCaseId: string
): Promise<DeleteTestCaseResponse> {
  try {
    const response = await api.delete(`/test_cases/${testCaseId}`, {
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
