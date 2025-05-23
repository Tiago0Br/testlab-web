'use server'

import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

interface LoginProps {
  email: string
  password: string
}

export async function login({ email, password }: LoginProps) {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('Email ou senha incorretos')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw new Error('Email ou senha incorretos')
  }

  return user
}
