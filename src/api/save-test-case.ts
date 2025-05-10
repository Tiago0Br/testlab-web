import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

interface SaveTestCaseRequest {
  id?: number
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

interface SaveTestCaseResponse extends ApiResponse {
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

export async function saveTestCase({
  id,
  title,
  summary,
  preconditions,
  test_suite_id
}: SaveTestCaseRequest): Promise<SaveTestCaseResponse> {
  try {
    const token = await getSessionToken()

    const path = id ? `/test_cases/${id}` : `/test_cases/new`
    const method = id ? 'put' : 'post'
    const response = await api[method](
      path,
      {
        id,
        title,
        summary,
        preconditions,
        test_suite_id
      },
      {
        headers: {
          Authorization: token
        }
      }
    )

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
