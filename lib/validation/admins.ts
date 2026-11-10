import { z } from 'zod'
import { email, optionalText } from './common'

export const createAdminSchema = z.object({
  email,
  password: z.string().min(8, 'must be at least 8 characters').max(128),
  role: z.enum(['admin', 'superadmin']).default('admin'),
  displayName: optionalText(100)
})

export const updateAdminSchema = z
  .object({
    role: z.enum(['admin', 'superadmin']),
    active: z.boolean()
  })
  .partial()
  .refine((data) => data.role !== undefined || data.active !== undefined, 'Nothing to update')
