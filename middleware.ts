import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  

  if (pathname.startsWith('/dashboard')) {

    const token = request.cookies.get('token')?.value;
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Check if user is trying to access login page while already logged in
  if (pathname === '/login') {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};