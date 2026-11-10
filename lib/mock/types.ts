/**
 * Shapes for content that has no Firestore collection yet. They mirror the
 * objects the branch pages already rendered (gallery photo, testimonial,
 * staff card) rather than introducing new structures.
 */
export interface GalleryItem {
  src: string
  caption: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  text: string
  grade: string
}

export interface FacultyMember {
  id: string
  name: string
  role: string
  photo: string
}
