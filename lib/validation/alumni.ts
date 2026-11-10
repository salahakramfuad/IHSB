import { z } from 'zod'
import { httpUrl, optionalEmail, optionalText, optionalUrl, text, year } from './common'

// ---- Featured alumni ----
const featuredAlumniFields = {
  name: text(150),
  description: text(500),
  achievement: text(500),
  graduationYear: year,
  imageUrl: httpUrl,
  email: optionalEmail,
  linkedin: optionalUrl.transform((value) => value || undefined),
  company: optionalText(200),
  location: optionalText(200),
  featured: z.boolean()
}

export const createFeaturedAlumniSchema = z.object({
  ...featuredAlumniFields,
  featured: featuredAlumniFields.featured.default(false)
})

/** On update, optional contact fields may be sent as ''/null to clear them. */
export const updateFeaturedAlumniSchema = z
  .object({
    ...featuredAlumniFields,
    email: z.union([z.literal(''), z.null(), z.string().trim().toLowerCase().max(200).pipe(z.email())]),
    linkedin: z.union([z.literal(''), z.null(), httpUrl]),
    company: z.union([z.null(), z.string().trim().max(200)]),
    location: z.union([z.null(), z.string().trim().max(200)])
  })
  .partial()

// ---- Alumni stories ----
const alumniStoryFields = {
  title: text(200),
  excerpt: text(1_000),
  content: text(50_000),
  author: text(150),
  authorRole: text(200),
  imageUrl: httpUrl,
  date: text(64),
  published: z.boolean(),
  featured: z.boolean()
}

export const createAlumniStorySchema = z.object({
  ...alumniStoryFields,
  date: alumniStoryFields.date.optional().transform((value) => value ?? new Date().toISOString()),
  published: alumniStoryFields.published.default(false),
  featured: alumniStoryFields.featured.default(false)
})

export const updateAlumniStorySchema = z.object(alumniStoryFields).partial()

// ---- Year statistics ----
export const alumniYearParam = z.string().regex(/^\d{4}$/, 'must be a 4-digit year')
const count = z
  .union([z.string().trim().min(1).max(20), z.number().int().nonnegative()])
  .transform((value) => String(value))
  .pipe(z.string().regex(/^\d{1,7}\+?$/, 'must be a number, optionally followed by +'))

export const alumniStatsPostSchema = z.union([
  z.object({ recalculate: z.literal(true) }),
  z.object({
    year: z.union([alumniYearParam, z.number().int()]).transform((value) => String(value)).pipe(alumniYearParam),
    count,
    autoCalculated: z.boolean().default(false)
  })
])

export const alumniStatsPutSchema = z.union([
  z.object({ recalculate: z.literal(true) }),
  z.object({ count, autoCalculated: z.boolean().default(false) })
])
