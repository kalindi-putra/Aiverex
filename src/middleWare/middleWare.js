import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  
  const publicPaths = ['/', '/auth/login', '/auth/register'];
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get('session')?.value;
  
 
  if (path.startsWith('/student') || path.startsWith('/mentor')) {
    if (!hasSession) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/register',
    '/student/:path*',
    '/mentor/:path*'
  ]
};