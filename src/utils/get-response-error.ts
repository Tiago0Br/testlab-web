import { isAxiosError } from 'axios'
import { DEFAULT_ERROR_MESSAGE } from './constants'

export function getResponseError(error: unknown) {
  let message = DEFAULT_ERROR_MESSAGE
  if (isAxiosError(error)) {
    message = error.response?.data?.message as string
  }

  return message
}
