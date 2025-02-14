import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session'

const protectedRoutes = ['/app']
const publicRoutes = ['/login', '/']
 
export default async function middleware(req: NextRequest) {
    // Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // Decrypt session from session cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    // Redirect to login if the user is not authenticated
    if (isProtectedRoute && !session?.sub) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Redirect to dashboard if the user is authenticated
    if (isPublicRoute && session?.sub) {
        return NextResponse.redirect(new URL('/app', req.nextUrl))
    }
   
    return NextResponse.next()
  }
   
  // Routes Middleware should not run on
  export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }