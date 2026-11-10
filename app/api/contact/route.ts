import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { enforceRateLimit, getClientIp } from '@/lib/security/rateLimit'
import { verifyRecaptcha } from '@/lib/security/recaptcha'
import { errorResponse, json, parseJsonBody, serverError } from '@/lib/utils/http'
import { contactSchema } from '@/lib/validation/contact'

/** POST /api/contact — public contact form (reCAPTCHA + rate limited). */
export async function POST(request: NextRequest) {
  try {
    const limited = enforceRateLimit(request, 'contact', { limit: 5, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    const body = await parseJsonBody(request, contactSchema)
    if (!body.ok) return body.response
    const { name, email, message, recaptchaToken } = body.data

    const captcha = await verifyRecaptcha(recaptchaToken, 'contact_submit', getClientIp(request))
    if (!captcha.ok) {
      console.warn('[api] POST /api/contact reCAPTCHA failed:', captcha.reason)
      return errorResponse('Verification failed. Please refresh the page and try again.', 403)
    }

    const { EMAIL_USER, EMAIL_PASS, CONTACT_TO_EMAIL } = process.env
    if (!EMAIL_USER || !EMAIL_PASS || !CONTACT_TO_EMAIL) {
      console.error('[api] POST /api/contact: EMAIL_USER, EMAIL_PASS or CONTACT_TO_EMAIL is not set')
      return errorResponse('Service temporarily unavailable. Please try again later.', 503)
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    })

    await transporter.sendMail({
      from: EMAIL_USER,
      replyTo: email, // replyTo (not from) so the sender address cannot be spoofed
      to: CONTACT_TO_EMAIL,
      subject: `New Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`
    })

    // The acknowledgement must not block or fail the request
    await transporter
      .sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting us',
        text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nInternational Hope School Bangladesh`
      })
      .catch((error) => console.error('[api] POST /api/contact: acknowledgement email failed:', error))

    return json({ success: true })
  } catch (error) {
    return serverError('POST /api/contact', error, 'Failed to send your message. Please try again.')
  }
}
