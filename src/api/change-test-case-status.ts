import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface ChangeTestCaseStatusRequest {
  status: string
  note?: string
  testCaseId: number
  token: string
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
  token,
}: ChangeTestCaseStatusRequest): Promise<ChangeTestCaseStatusResponse> {
  try {
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
