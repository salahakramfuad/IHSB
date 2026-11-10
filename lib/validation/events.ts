import { z } from 'zod'
import { dateInput, optionalText, optionalUrl, text } from './common'

const eventFields = {
  title: text(200),
  description: text(10_000),
  date: dateInput,
  time: optionalText(100),
  location: optionalText(200),
  image: optionalUrl.transform((value) => value || undefined),
  category: z.enum(['academic', 'sports', 'cultural', 'admission', 'other']),
  featured: z.boolean(),
  registrationRequired: z.boolean(),
  registrationUrl: optionalUrl.transform((value) => value || undefined)
}

export const createEventSchema = z.object({
  ...eventFields,
  featured: eventFields.featured.default(false),
  registrationRequired: eventFields.registrationRequired.default(false)
})

export const updateEventSchema = z.object(eventFields).partial()
