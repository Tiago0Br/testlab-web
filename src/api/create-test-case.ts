import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'

interface CreateTestCaseRequest {
  title: string
  summary: string
  preconditions?: string
  test_suite_id: number
  token: string
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
  token,
}: CreateTestCaseRequest): Promise<CreateTestCaseResponse> {
  try {
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
