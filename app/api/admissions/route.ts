import { randomUUID } from 'node:crypto'
import { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/auth/middleware'
import { isOwnCloudinaryUrl } from '@/lib/integrations/cloudinary/config'
import { createAdmission } from '@/lib/database/admissions'
import { getAdmissionsByStatusService, getAllAdmissionsService } from '@/lib/services/admissionsService'
import { isMockMode, mockWriteBlockedResponse } from '@/lib/mock'
import { enforceRateLimit, getClientIp } from '@/lib/security/rateLimit'
import { verifyRecaptcha } from '@/lib/security/recaptcha'
import { errorResponse, json, parseJsonBody, serverError } from '@/lib/utils/http'
import { admissionStatusParam, createAdmissionSchema } from '@/lib/validation/admissions'

export async function GET(request: NextRequest) {
  try {
    // Admissions contain personal data of minors: admins only
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response

    const status = admissionStatusParam.safeParse(new URL(request.url).searchParams.get('status'))
    const admissions = status.success ? await getAdmissionsByStatusService(status.data) : await getAllAdmissionsService()

    return json({ admissions })
  } catch (error) {
    return serverError('GET /api/admissions', error, 'Failed to fetch admissions.')
  }
}

/** Public endpoint: application submissions (reCAPTCHA + rate limited). */
export async function POST(request: NextRequest) {
  try {
    const limited = enforceRateLimit(request, 'admissions', { limit: 5, windowMs: 60 * 60 * 1000 })
    if (limited) return limited

    const body = await parseJsonBody(request, createAdmissionSchema)
    if (!body.ok) return body.response
    const { recaptchaToken, ...application } = body.data

    const captcha = await verifyRecaptcha(recaptchaToken, 'admission_submit', getClientIp(request))
    if (!captcha.ok) {
      console.warn('[api] POST /api/admissions reCAPTCHA failed:', captcha.reason)
      return errorResponse('Verification failed. Please refresh the page and try again.', 403)
    }

    if (isMockMode()) return mockWriteBlockedResponse()

    // Document links must be files uploaded through /api/upload/public (our own Cloudinary cloud)
    const documents = [
      application.studentPhoto,
      application.birthCertificateImage,
      application.lastYearReportCardImage,
      application.passportImage,
      application.visitingCardImage
    ].filter((url): url is string => Boolean(url))
    if (!documents.every(isOwnCloudinaryUrl)) {
      return errorResponse('Invalid request. One or more uploaded documents are not valid.', 400)
    }

    // Server-generated, unguessable reference (never taken from the client)
    const applicationNumber = `APP-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`

    const id = await createAdmission({ ...application, applicationNumber })

    return json({
      id,
      message: 'Application submitted successfully',
      applicationNumber
    })
  } catch (error) {
    return serverError('POST /api/admissions', error, 'Failed to submit application. Please try again.')
  }
}
