import bcrypt from 'bcrypt'
import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const { name, email, password } = (await request.json()) as RegisterRequest

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (userAlreadyExists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10)
    }
  })

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
}
