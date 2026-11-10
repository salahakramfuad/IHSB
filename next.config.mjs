// next.config.mjs
const isDev = process.env.NODE_ENV !== 'production'

/**
 * Content-Security-Policy.
 * - 'unsafe-inline' for scripts is required by Next.js inline bootstrap scripts
 *   (static pages cannot carry a per-request nonce); 'unsafe-eval' is dev only
 *   (React Fast Refresh).
 * - Google hosts: reCAPTCHA v3 (script + frame), Maps embeds (frame),
 *   Firebase Auth / Google APIs (connect).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://picsum.photos https://fastly.picsum.photos https://www.gstatic.com",
  "font-src 'self' data:",
  `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://www.google.com/recaptcha/ https://www.gstatic.com${isDev ? ' ws://localhost:* http://localhost:* http://127.0.0.1:*' : ''}`,
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/ https://www.google.com/maps/",
  "media-src 'self' https://res.cloudinary.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests'])
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' } // Cloudinary images
    ]
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Admin dashboard and API responses must never be cached by shared caches
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }]
      }
    ]
  }
}

export default nextConfig
