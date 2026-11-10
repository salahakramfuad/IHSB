import type { GalleryItem } from '@/lib/services/siteContentService'
import LightboxGallery from '../shared/LightboxGallery'
import Section, { SectionHeader } from '../ui/Section'

export default function Gallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null
  return (
    <Section background='sunken' aria-labelledby='gallery-heading'>
      <SectionHeader
        id='gallery-heading'
        title='Campus life'
        description='Lessons, laboratories, matches and festivals. Select a photo to see it larger.'
      />
      <LightboxGallery images={items} />
    </Section>
  )
}
