import { z } from 'zod'
import { dateInput, httpUrl, optionalText, photoList, text } from './common'

const sportsFields = {
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1)
    .max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must contain only lowercase letters, numbers and hyphens'),
  title: text(200),
  sport: z.enum(['Football', 'Basketball', 'Badminton', 'Chess', 'Events']),
  placement: z.enum(['Champion', 'Runner-up', 'Participant', 'Award']),
  description: text(5_000),
  date: dateInput,
  image: httpUrl,
  location: optionalText(200),
  photos: photoList.optional(),
  longDescription: optionalText(30_000)
}

export const createSportsSchema = z.object(sportsFields)
export const updateSportsSchema = z.object(sportsFields).partial()
