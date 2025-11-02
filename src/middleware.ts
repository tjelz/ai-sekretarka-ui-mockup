import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * Middleware to protect routes that require authentication
 * Runs on every request to check authentication status
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth/login', '/api/auth/register'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Allow access to public routes
  if (isPublicRoute) {
    // Redirect to dashboard if already authenticated
    if (token && pathname === '/login') {
      const payload = verifyToken(token.value);
      if (payload) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token validity
  const payload = verifyToken(token.value);
  if (!payload) {
    // Token is invalid, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }

  // Token is valid, allow access
  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
