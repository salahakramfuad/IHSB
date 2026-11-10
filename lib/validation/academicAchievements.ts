import { z } from 'zod'
import { optionalUrl, text, year } from './common'

const achievementFields = {
  name: text(150),
  result: text(500),
  year,
  session: z.enum(['O Level', 'AS Level', 'A Level'])
}

export const createAcademicAchievementSchema = z.object({
  ...achievementFields,
  image: optionalUrl.transform((value) => value || undefined)
})

/** On update, image may be ''/null to clear it. */
export const updateAcademicAchievementSchema = z
  .object({ ...achievementFields, image: optionalUrl })
  .partial()
