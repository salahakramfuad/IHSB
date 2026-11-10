import type { AcademicAchievementDocument } from '@/lib/database/academicAchievements'
import { daysFromNow, ts, yearFromNow } from './helpers'
import { portraits } from './images'

type Seed = Omit<AcademicAchievementDocument, 'id' | 'year' | 'createdAt' | 'updatedAt'> & {
  slug: string
  yearsAgo: number
}

const seeds: Seed[] = [
  // ---- A Level ----
  { slug: 'ayesha-siddiqua', name: 'Ayesha Siddiqua', result: '4 A* (Mathematics, Further Mathematics, Physics, Chemistry)', session: 'A Level', yearsAgo: 0, image: portraits.woman1 },
  { slug: 'rafsan-karim', name: 'Rafsan Karim', result: '3 A*, 1 A · Top in Bangladesh, A Level Physics', session: 'A Level', yearsAgo: 0, image: portraits.man1 },
  { slug: 'elif-kaya', name: 'Elif Kaya', result: '3 A* (Biology, Chemistry, Mathematics)', session: 'A Level', yearsAgo: 0, image: portraits.woman2 },
  { slug: 'arjun-mehta', name: 'Arjun Mehta', result: '2 A*, 2 A · Top in Bangladesh, A Level Accounting', session: 'A Level', yearsAgo: 1, image: portraits.man2 },
  { slug: 'nabila-hossain', name: 'Nabila Hossain', result: '3 A* (Economics, Mathematics, Business)', session: 'A Level', yearsAgo: 1, image: portraits.woman3 },
  // ---- AS Level ----
  { slug: 'mahir-faisal', name: 'Mahir Faisal', result: '4 A (Mathematics, Physics, Chemistry, Computer Science)', session: 'AS Level', yearsAgo: 0, image: portraits.man3 },
  { slug: 'zara-islam', name: 'Zara Islam', result: '4 A · Top in the World, AS Level Mathematics', session: 'AS Level', yearsAgo: 0, image: portraits.woman4 },
  { slug: 'yusuf-demir', name: 'Yusuf Demir', result: '3 A, 1 B (Physics, Mathematics, Economics, English)', session: 'AS Level', yearsAgo: 0, image: portraits.man4 },
  { slug: 'samira-haque', name: 'Samira Haque', result: '4 A (Biology, Chemistry, Mathematics, Psychology)', session: 'AS Level', yearsAgo: 1, image: portraits.woman5 },
  // ---- O Level / IGCSE ----
  { slug: 'tahsin-ahmed', name: 'Tahsin Ahmed', result: '9 A* · Top in Bangladesh, IGCSE Mathematics', session: 'O Level', yearsAgo: 0, image: portraits.man5 },
  { slug: 'maliha-chowdhury', name: 'Maliha Chowdhury', result: '9 A*', session: 'O Level', yearsAgo: 0, image: portraits.woman6 },
  { slug: 'daniel-okafor', name: 'Daniel Okafor', result: '8 A*, 1 A', session: 'O Level', yearsAgo: 0, image: portraits.man1 },
  { slug: 'nusrat-jahan', name: 'Nusrat Jahan', result: '8 A*, 1 A · Top in Bangladesh, IGCSE Chemistry', session: 'O Level', yearsAgo: 0, image: portraits.woman7 },
  { slug: 'ishaan-roy', name: 'Ishaan Roy', result: '7 A*, 2 A', session: 'O Level', yearsAgo: 1, image: portraits.man2 },
  { slug: 'aylin-yildiz', name: 'Aylin Yildiz', result: '8 A*', session: 'O Level', yearsAgo: 1, image: portraits.woman2 }
]

export const mockAcademicAchievements: AcademicAchievementDocument[] = seeds.map(({ slug, yearsAgo, ...item }, index) => {
  const created = daysFromNow(-(85 + index), 6)
  return {
    id: `mock-achievement-${slug}`,
    ...item,
    year: yearFromNow(-yearsAgo),
    createdAt: ts(created),
    updatedAt: ts(created)
  }
})
