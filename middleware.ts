import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Excluir la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Por ahora, verificamos un token simple en localStorage
    // En producción, esto debería verificar un JWT
    const authCookie = request.cookies.get('adminAuth')
    
    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}