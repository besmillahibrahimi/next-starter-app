import { isAuthenticated } from '@/lib/http/auth'
import { PRIVATE_ROUTES } from '@/lib/http/contants'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("mm 100 - - -  in middleware - - - - -- - --   ",  request)
    if (!isAuthenticated())
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    else   return NextResponse.next();  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', ...PRIVATE_ROUTES],
}
