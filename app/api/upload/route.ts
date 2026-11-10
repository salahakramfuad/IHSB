import { NextRequest } from 'next/server'
import { requireAdminWrite } from '@/lib/auth/middleware'
import { validateAndUpload } from '@/lib/integrations/cloudinary/upload'
import { enforceRateLimit } from '@/lib/security/rateLimit'
import { errorResponse, json, serverError } from '@/lib/utils/http'

/** POST /api/upload — admin image uploads (dashboard content). */
export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const limited = enforceRateLimit(request, 'upload-admin', { limit: 120, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return errorResponse('Invalid upload request.', 400)
    }

    const result = await validateAndUpload(formData.get('file'), {
      folder: 'ihsb',
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
    })
    if (!result.ok) return errorResponse(result.error, result.status)

    return json({ success: true, url: result.url, publicId: result.publicId })
  } catch (error) {
    return serverError('POST /api/upload', error, 'Upload failed. Please try again.')
  }
}
