import { z } from 'zod'

export const MAX_AI_INPUT_LENGTH = 20_000

export const improveTextSchema = z.object({
  text: z.string().max(MAX_AI_INPUT_LENGTH * 2)
})
