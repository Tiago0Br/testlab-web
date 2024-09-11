import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface TestCaseStatus {
  id: number
  description: string
  note?: string
  created_at: string
}

interface GetTestCaseByIdResponse extends ApiResponse {
  data?: {
    id: number
    title: string
    summary: string
    preconditions?: string
    test_suite: {
      id: number
      title: string
    }
    status: TestCaseStatus
    history: TestCaseStatus[]
    previous_test_case_id?: number
    next_test_case_id?: number
  }
}

export async function getTestCaseById(
  token: string,
  testCaseId: number
): Promise<GetTestCaseByIdResponse> {
  try {
    const response = await api.get(`/test_cases/${testCaseId}`, {
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
