import { NextRequest } from 'next/server'
import { validateAndUpload } from '@/lib/integrations/cloudinary/upload'
import { isMockMode, mockWriteBlockedResponse } from '@/lib/mock'
import { MAX_UPLOAD_BYTES } from '@/lib/security/fileType'
import { enforceRateLimit, getClientIp } from '@/lib/security/rateLimit'
import { verifyRecaptcha } from '@/lib/security/recaptcha'
import { errorResponse, json, serverError } from '@/lib/utils/http'

/**
 * POST /api/upload/public — the single public upload endpoint, used by the
 * admission form for supporting documents.
 *
 * Protections: per-IP rate limit, reCAPTCHA v3 (server verified), 5MB limit,
 * and real file-type detection via magic bytes (JPEG/PNG/WebP/PDF only).
 */
export async function POST(request: NextRequest) {
  try {
    const limited = enforceRateLimit(request, 'upload-public', { limit: 20, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    // Reject oversized bodies before buffering them (multipart overhead allowed for)
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_UPLOAD_BYTES + 64 * 1024) {
      return errorResponse('File size exceeds 5MB limit', 413)
    }

    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return errorResponse('Invalid upload request.', 400)
    }

    const captcha = await verifyRecaptcha(formData.get('recaptchaToken'), 'admission_upload', getClientIp(request))
    if (!captcha.ok) {
      console.warn('[api] POST /api/upload/public reCAPTCHA failed:', captcha.reason)
      return errorResponse('Verification failed. Please refresh the page and try again.', 403)
    }

    if (isMockMode()) return mockWriteBlockedResponse()

    const result = await validateAndUpload(formData.get('file'), {
      folder: 'ihsb/admissions',
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    })
    if (!result.ok) return errorResponse(result.error, result.status)

    return json({ success: true, url: result.url, publicId: result.publicId })
  } catch (error) {
    return serverError('POST /api/upload/public', error, 'Upload failed. Please try again.')
  }
}
