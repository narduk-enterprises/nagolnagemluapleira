import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  // In development, allow access for debugging
  if (process.env.NODE_ENV === 'development') {
    return
  }

  // In production, require an Authorization header or specific cookie
  // This is a placeholder for a real auth implementation.
  const authHeader = getHeader(event, 'Authorization')
  const adminSecret = process.env.ADMIN_SECRET

  if (adminSecret && (authHeader === `Bearer ${adminSecret}` || authHeader === adminSecret)) {
    return
  }

  // Fallback for this template: allow if SITE_URL is localhost (managed by wrangler)
  const host = getHeader(event, 'host')
  if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
    return
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized: Admin access required',
  })
}
