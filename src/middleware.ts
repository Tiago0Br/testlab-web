import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('testlab-user-token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register|images).*)'
}
