import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)'
}

const publicRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const token = cookies().get('testlab.token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
