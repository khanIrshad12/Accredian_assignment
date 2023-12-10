import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path=request.nextUrl.pathname
    const isPublicPath = path === '/' || path=== "/sign-In"
    const token = request.cookies.get('token')?.value || '';
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/dashboard',request.nextUrl));

    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/sign-In',request.nextUrl))
    }
}
 
export const config = {
  matcher:[
    '/',
    '/sign-In',
    '/dashboard'
  ],
}