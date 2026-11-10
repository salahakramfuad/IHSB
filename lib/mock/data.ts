/**
 * All mock content in one place. Import from here (not from lib/mock/index.ts)
 * when the data itself is needed; index.ts only holds the mode switch so that
 * route guards do not pull the whole data set in.
 */
export { mockNews } from './news'
export { mockEvents } from './events'
export { mockSports } from './sports'
export { mockAnnouncements } from './announcements'
export { mockFeaturedAlumni, mockAlumniStories, mockAlumniYearStats } from './alumni'
export { mockAcademicAchievements } from './academicAchievements'
export { mockHighlights } from './highlights'
export { mockAdmissions } from './admissions'
export { mockNotifications } from './notifications'
export { mockGallery } from './gallery'
export { mockFaculty } from './faculty'
export { mockTestimonials } from './testimonials'
export type { GalleryItem, FacultyMember, Testimonial } from './types'
