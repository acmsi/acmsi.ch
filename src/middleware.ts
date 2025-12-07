import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next()

  // Content Security Policy (Balanced approach)
  const cspDirectives = [
    "default-src 'self'",
    // Allow inline styles for Next.js and Tailwind
    "style-src 'self' 'unsafe-inline' https://unpkg.com",
    // Scripts: self, Next.js, Netlify Identity, MapLibre, Netlify RUM
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://unpkg.com https://netlify-rum.netlify.app",
    // Workers: allow blob URLs for MapLibre GL performance optimization
    "worker-src 'self' blob:",
    // Child sources: allow blob URLs for workers
    "child-src 'self' blob:",
    // Images: self, data URIs, and external sources (including OpenStreetMap tiles)
    "img-src 'self' data: https: http:",
    // Fonts: self and data URIs
    "font-src 'self' data:",
    // Connect: self, external APIs, and OpenStreetMap tiles
    "connect-src 'self' https://identity.netlify.com https://unpkg.com https://api.maptiler.com https://tile.openstreetmap.org wss://*.netlify.app wss://*.netlify.com",
    // Frames: self, Mawaqit prayer times widget, and Netlify deploy previews
    "frame-src 'self' https://mawaqit.net https://app.netlify.com",
    // Only allow same-origin embedding
    "frame-ancestors 'self'",
    // Forms can only submit to self
    "form-action 'self'",
    // Base URI restriction
    "base-uri 'self'",
    // Object/embed restriction
    "object-src 'none'",
  ].join('; ')

  response.headers.set('Content-Security-Policy', cspDirectives)

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer Policy - send full URL on same origin, only origin on cross-origin
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy - restrict access to browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  )

  // Strict-Transport-Security (HSTS) - force HTTPS
  // Only set in production to avoid issues in development
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    )
  }

  return response
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
}
