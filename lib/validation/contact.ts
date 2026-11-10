import { z } from 'zod'
import { email, recaptchaToken } from './common'

/** Strip CR/LF so values can never inject extra email headers. */
const singleLine = (max: number, min: number) =>
  z
    .string()
    .transform((value) => value.replace(/[\r\n]+/g, ' ').trim())
    .pipe(z.string().min(min, `must be at least ${min} characters`).max(max))

export const contactSchema = z.object({
  name: singleLine(200, 2),
  email,
  message: z.string().trim().min(10, 'must be at least 10 characters').max(5_000),
  recaptchaToken
})
