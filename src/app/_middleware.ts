// app/_middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname, search, locale } = request.nextUrl

  if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
    // Ignore Next.js files and API routes
    return
  }

  if (locale === undefined) {
    const defaultLocale = 'en' // set your default locale here
    url.search = `next-locale=${defaultLocale}`
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
