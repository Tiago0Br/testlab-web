import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface CreateTestCaseRequest {
  title: string
  summary: string
  preconditions?: string
  test_suite_id: number
}

interface TestCaseStatus {
  id: number
  description: string
  note?: string
  created_at: string
}

interface CreateTestCaseResponse extends ApiResponse {
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

export async function createTestCase({
  title,
  summary,
  preconditions,
  test_suite_id,
}: CreateTestCaseRequest): Promise<CreateTestCaseResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.post(
      `/test_cases/new`,
      {
        title,
        summary,
        preconditions,
        test_suite_id,
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
