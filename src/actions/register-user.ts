'use server'

import bcrypt from 'bcrypt'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'

export async function registerUser({ name, email, password }: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10)
    }
  })
}
