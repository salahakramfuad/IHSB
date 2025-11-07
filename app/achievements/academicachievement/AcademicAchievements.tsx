// components/AcademicAchievements.tsx
'use client'
import React from 'react'
import { faker } from '@faker-js/faker'
import { useThemeMode } from '../../../hooks/useThemeMode'

interface Student {
  id: string
  name: string
  result: string
  image: string
}

interface AchievementSectionProps {
  title: string
  emoji: string
  students: Student[]
  sectionId: string
}

const RESULTS_OLEVEL = ['6A* 2A', '5A* 3A', '7A* 1A', '6A* 1A 1B', '4A* 4A']
const RESULTS_AS = ['4A', '3A 1B', '2A* 2A', '3A* 1A']
const RESULTS_ALEVEL = ['4A*', '3A* 1A', '2A* 2A', '2A* 1A 1B']

function makeStudents(
  count: number,
  idPrefix: string,
  resultPool: string[]
): Student[] {
  return Array.from({ length: count }, (_, i) => {
    faker.seed(2025 * (i + 1) + idPrefix.length)

    const seed = `${idPrefix}-${i + 1}`

    return {
      id: `${idPrefix}-${i + 1}-${faker.string.alphanumeric(4).toLowerCase()}`,
      name: faker.person.fullName(),
      result: faker.helpers.arrayElement(resultPool),
      // FIX: build Picsum URL manually; v8 types don’t allow `seed` option
      image: `https://picsum.photos/seed/${encodeURIComponent(
        seed
      )}/800/500?blur=1`
    }
  })
}

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  const theme = useThemeMode()
  const [imgSrc, setImgSrc] = React.useState(student.image)

  const handleImageError = () => setImgSrc('/assets/images/default-avatar.png')

  return (
    <article
      className='flex flex-col h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1'
      aria-label={`Achievement of ${student.name}: ${student.result}`}
      style={{ backgroundColor: theme.surface }}
    >
      {/* Portrait image area */}
      <div className='relative w-full aspect-[3/3] md:aspect-[3/3]'>
        <img
          src={imgSrc}
          alt={student.name}
          className='absolute inset-0 w-full h-full object-cover'
          loading='lazy'
          onError={handleImageError}
        />
        <div className='absolute inset-0 bg-black/30 flex items-end p-4'>
          <h3 className='text-lg md:text-xl font-bold text-white line-clamp-1'>
            {student.name}
          </h3>
        </div>
      </div>

      {/* Text area */}
      <div className='p-6'>
        <p
          className='text-sm md:text-base'
          style={{ color: theme.textSecondary }}
        >
          <span className='font-semibold' style={{ color: theme.text }}>
            Result:
          </span>{' '}
          {student.result}
        </p>
      </div>
    </article>
  )
}

const AchievementSection: React.FC<AchievementSectionProps> = ({
  title,
  emoji,
  students,
  sectionId
}) => {
  const theme = useThemeMode()

  return (
    <section className='mb-12 z-10' aria-labelledby={sectionId}>
      <h2
        id={sectionId}
        className='text-3xl font-bold mb-6 flex items-center'
        style={{ color: theme.text }}
      >
        <span className='mr-2' aria-hidden='true'>
          {emoji}
        </span>
        {title}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch'>
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </section>
  )
}

const AcademicAchievements: React.FC = () => {
  const theme = useThemeMode()

  // Generate once per mount; deterministic via seeding.
  const data = React.useMemo(() => {
    return {
      oLevel: makeStudents(6, 'ol', RESULTS_OLEVEL),
      asLevel: makeStudents(6, 'asl', RESULTS_AS),
      aLevel: makeStudents(6, 'al', RESULTS_ALEVEL)
    }
  }, [])

  return (
    <div
      className='py-16 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: theme.background }}
    >
      <div className='max-w-6xl mx-auto'>
        <header
          className='relative mx-auto mb-12 max-w-4xl text-center px-4'
          aria-label='Academic Achievements section header'
        >
          {/* Soft radial glow */}
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0 -z-10 opacity-30
               bg-[radial-gradient(60%_60%_at_50%_10%,var(--primary)_0%,transparent_60%)]'
          />

          <h1
            className='inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight
             bg-gradient-to-r
             from-[var(--primary,#0EA5E9)] to-[var(--secondary,#22D3EE)]
             bg-clip-text drop-shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          >
            Academic Achievements
          </h1>

          {/* Accent underline */}
          <div
            className='mx-auto mt-3 h-1 w-24 rounded-full
               bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
               shadow-[0_0_16px_2px_rgba(0,0,0,0.05)]'
          />

          <p className='mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-[color:var(--text-secondary)]'>
            Celebrating the outstanding academic success of our students.
          </p>

          <p className='mt-2 text-sm text-[color:var(--text-secondary)]/70'>
            Cambridge Curriculum • Results that inspire confidence and curiosity
          </p>
        </header>

        <AchievementSection
          sectionId='o-level'
          title='O Level Achievements'
          emoji='🎓'
          students={data.oLevel}
        />
        <AchievementSection
          sectionId='as-level'
          title='AS Level Achievements'
          emoji='📚'
          students={data.asLevel}
        />
        <AchievementSection
          sectionId='a-level'
          title='A Level Achievements'
          emoji='🏆'
          students={data.aLevel}
        />
      </div>
    </div>
  )
}

export default AcademicAchievements
