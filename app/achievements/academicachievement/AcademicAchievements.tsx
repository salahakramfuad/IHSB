// components/AcademicAchievements.tsx
'use client'
import React from 'react'
import { AcademicAchievementDocument } from '@/lib/database/academicAchievements'

interface Student {
  id: string
  name: string
  result: string
  image?: string
}

interface AchievementSectionProps {
  title: string
  emoji: string
  students: Student[]
  sectionId: string
}

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  const [imgSrc, setImgSrc] = React.useState(student.image || '')

  const handleImageError = () => setImgSrc('')

  return (
    <article
      className='flex flex-col h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 bg-white border-2 border-gray-100'
      aria-label={`Achievement of ${student.name}: ${student.result}`}
    >
      {/* Portrait image area */}
      <div className='relative w-full aspect-[3/3] md:aspect-[3/3] bg-gradient-to-br from-primary-green-100 to-accent-blue-100'>
        {student.image ? (
          <>
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
          </>
        ) : (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center p-4'>
              <div className='text-4xl mb-2'>🎓</div>
              <h3 className='text-lg md:text-xl font-bold text-gray-800 line-clamp-2'>
                {student.name}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Text area */}
      <div className='p-6'>
        <p className='text-sm md:text-base text-gray-600'>
          <span className='font-semibold text-gray-900'>Result:</span>{' '}
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
  return (
    <section className='mb-12 z-10' aria-labelledby={sectionId}>
      <h2
        id={sectionId}
        className='text-3xl font-bold mb-6 flex items-center text-gray-900'
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
  const [achievements, setAchievements] = React.useState<AcademicAchievementDocument[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/academic-achievements')
      const data = await response.json()
      setAchievements(data.achievements || [])
    } catch (error) {
      console.error('Error fetching academic achievements:', error)
      setAchievements([])
    } finally {
      setLoading(false)
    }
  }

  // Convert Firestore data to Student format
  const data = React.useMemo(() => {
    const oLevel = achievements
      .filter(a => a.session === 'O Level')
      .map(a => ({
        id: a.id || '',
        name: a.name,
        result: a.result,
        image: a.image
      }))
    
    const asLevel = achievements
      .filter(a => a.session === 'AS Level')
      .map(a => ({
        id: a.id || '',
        name: a.name,
        result: a.result,
        image: a.image
      }))
    
    const aLevel = achievements
      .filter(a => a.session === 'A Level')
      .map(a => ({
        id: a.id || '',
        name: a.name,
        result: a.result,
        image: a.image
      }))
    
    return { oLevel, asLevel, aLevel }
  }, [achievements])

  return (
    <div className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-green-50/30'>
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

          <h1 className='inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary-green-600 via-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.06)]'>
            Academic Achievements
          </h1>

          {/* Accent underline */}
          <div className='mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary-green-500 to-accent-blue-500 shadow-[0_0_16px_2px_rgba(0,0,0,0.05)]' />

          <p className='mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-700'>
            Celebrating the outstanding academic success of our students.
          </p>

          <p className='mt-2 text-sm text-gray-600'>
            Cambridge Curriculum • Results that inspire confidence and curiosity
          </p>
        </header>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading achievements...</p>
          </div>
        ) : (
          <>
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
          </>
        )}
        
        {!loading && achievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No academic achievements available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcademicAchievements
