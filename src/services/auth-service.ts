'use server'

import { User } from '@/utils/types'
import { cookies } from 'next/headers'
import { login } from '@/api'

const SESSION_TOKEN_KEY = 'testlab.token'
const USER_KEY = 'testlab.user'

export async function createSession(token: string, user: User) {
  const oneDay = new Date(Date.now() + 60 * 60 * 24 * 1000)

  cookies().set({
    name: SESSION_TOKEN_KEY,
    value: token,
    expires: oneDay,
    path: '/',
    httpOnly: true
  })

  cookies().set({
    name: USER_KEY,
    value: JSON.stringify(user),
    expires: oneDay,
    path: '/',
    httpOnly: true
  })
}

export async function signIn(email: string, password: string) {
  const response = await login(email, password)
  if (response.data) {
    const user = response.data.user as User
    const token = response.data.token as string

    createSession(token, user)
  }

  return response
}

export async function logout() {
  destroySession()
}

export async function getSessionToken() {
  return cookies().get(SESSION_TOKEN_KEY)?.value ?? ''
}

export async function destroySession() {
  cookies().delete(SESSION_TOKEN_KEY)
  cookies().delete(USER_KEY)
}
