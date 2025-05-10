import { api } from '@/lib/axios'
import { ApiResponse } from './api-response'
import { getResponseError } from '@/utils'
import { getSessionToken } from '@/services/auth-service'

export interface TestCaseStatusOption {
  value: string
  label: string
  disabled?: boolean
}

interface ListTestCaseStatusResponse extends ApiResponse {
  data?: TestCaseStatusOption[]
}

export async function listTestCaseStatus(): Promise<ListTestCaseStatusResponse> {
  try {
    const token = await getSessionToken()
    const response = await api.get('/test_cases/status', {
      headers: {
        Authorization: token
      }
    })

    return {
      data: response.data
    }
  } catch (error) {
    return {
      error: getResponseError(error)
    }
  }
}
