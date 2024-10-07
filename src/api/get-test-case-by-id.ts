import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

export interface TestCaseStatus {
  id: number
  description: string
  note?: string
  created_at: string
  created_by?: string
}

export interface TestCaseDetails {
  id: number
  title: string
  summary: string
  status: TestCaseStatus
  history: TestCaseStatus[]
  preconditions?: string
  test_suite: {
    id: number
    title: string
  }
  previous_test_case_id?: number
  next_test_case_id?: number
}

interface GetTestCaseByIdResponse extends ApiResponse {
  data?: TestCaseDetails
}

export async function getTestCaseById(
  testCaseId: number
): Promise<GetTestCaseByIdResponse> {
  const token = await getSessionToken()
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
