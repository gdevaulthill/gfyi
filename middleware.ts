import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/password' ||
    pathname.startsWith('/password/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasAuthCookie = request.cookies.get('site-auth')?.value === 'true';

  if (hasAuthCookie) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/password';
  if (!url.searchParams.has('from') && pathname !== '/') {
    url.searchParams.set('from', pathname);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
