import { getFacultyService, getGalleryService, getTestimonialsService } from '@/lib/services/siteContentService'
import UttaraSeniorClient from './UttaraSeniorClient'

export const revalidate = 300

export default async function UttaraSeniorPage() {
  const [gallery, testimonials, staff] = await Promise.all([
    getGalleryService(8),
    getTestimonialsService(6),
    getFacultyService(4)
  ])

  return <UttaraSeniorClient gallery={gallery} testimonials={testimonials} staff={staff} />
}
