'use server'

import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function register(userData: Prisma.UserCreateInput) {
  const saltRounds = 10

  const userAlreadyExists = await prisma.user.findFirst({
    where: { email: userData.email }
  })

  if (userAlreadyExists) {
    throw new Error('E-mail já cadastrado!')
  }

  await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: await bcrypt.hash(userData.password, saltRounds)
    }
  })
}
