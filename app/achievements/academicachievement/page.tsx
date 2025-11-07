// app/achievements/academics/page.tsx
import AcademicAchievementsClient from './AcademicAchievements'

export const metadata = {
  title: 'Academic Achievements | IHSB',
  description:
    'Celebrating outstanding student results across O Level, AS Level, and A Level.'
}

export default function Page() {
  return <AcademicAchievementsClient />
}
