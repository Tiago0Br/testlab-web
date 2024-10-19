import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface DeleteTestCaseResponse extends ApiResponse {
  data?: {
    id: number
  }
}

export async function deleteTestCase(
  testCaseId: number
): Promise<DeleteTestCaseResponse> {
  try {
    const token = await getSessionToken()
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
