import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'

interface LoginProps {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as LoginProps

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
  }

  const token = await new SignJWT({ user_id: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

  const response = NextResponse.json({ user }, { status: 200 })

  response.cookies.set('testlab-user-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
  })

  return response
}
