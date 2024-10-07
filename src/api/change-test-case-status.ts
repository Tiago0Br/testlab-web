import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface ChangeTestCaseStatusRequest {
  status: string
  note?: string
  testCaseId: number
}

interface TestCaseStatus {
  id: number
  description: string
  note?: string
  created_at: string
}

interface ChangeTestCaseStatusResponse extends ApiResponse {
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
  }
}

export async function changeTestCaseStatus({
  status,
  note,
  testCaseId,
}: ChangeTestCaseStatusRequest): Promise<ChangeTestCaseStatusResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.put(
      `/test_cases/${testCaseId}/status`,
      {
        status,
        note: note || null,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    return {
      data: response.data,
    }
  } catch (error) {
    return {
      error: getResponseError(error),
    }
  }
}
