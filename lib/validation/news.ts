import { z } from 'zod'
import { dateInput, photoList, text } from './common'

const newsFields = {
  title: text(200),
  description: text(20_000),
  photos: photoList,
  category: z.enum(['sports', 'news', 'general']),
  date: dateInput
}

export const createNewsSchema = z.object({
  ...newsFields,
  photos: newsFields.photos.default([]),
  category: newsFields.category.default('general'),
  date: newsFields.date.optional()
})

export const updateNewsSchema = z.object(newsFields).partial()
