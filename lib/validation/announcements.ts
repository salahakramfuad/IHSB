import { z } from 'zod'
import { dateInput, optionalUrl, text } from './common'

const announcementFields = {
  title: text(200),
  content: text(20_000),
  image: optionalUrl.transform((value) => value || undefined),
  priority: z.enum(['low', 'medium', 'high']),
  featured: z.boolean(),
  isActive: z.boolean(),
  /** ISO string, or null/'' to clear the expiry. */
  expiresAt: z
    .union([z.literal(''), z.null(), dateInput])
    .optional()
    .transform((value) => (value === '' ? null : value))
}

export const createAnnouncementSchema = z.object({
  ...announcementFields,
  expiresAt: announcementFields.expiresAt.transform((value) => value ?? undefined),
  priority: announcementFields.priority.default('medium'),
  featured: announcementFields.featured.default(false),
  isActive: announcementFields.isActive.default(true)
})

export const updateAnnouncementSchema = z.object(announcementFields).partial()
