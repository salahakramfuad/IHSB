import type { FeaturedAlumniDocument } from '@/lib/database/alumni'
import { alumniDestinations } from '@/lib/geo'
import AcademicsGlobe from '../three/AcademicsGlobe'
import { ButtonLink } from '../ui/Button'
import Section from '../ui/Section'

export default function AlumniWorld({ alumni }: { alumni: FeaturedAlumniDocument[] }) {
  const destinations = alumniDestinations(alumni.map((person) => person.location))
  if (destinations.length === 0) return null

  // One alumnus per city for the text list (the accessible equivalent of the globe)
  const byCity = destinations.map((destination) => ({
    destination,
    person: alumni.find((candidate) => candidate.location === destination.label)
  }))

  return (
    <Section background='brand' aria-labelledby='alumni-heading' className='overflow-hidden'>
      <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
        <AcademicsGlobe destinations={destinations} className='mx-auto aspect-square w-full max-w-md lg:max-w-none' />

        <div>
          <h2 id='alumni-heading' className='font-display text-display-2 text-ink'>
            From Dhaka to the world
          </h2>
          <div className='gold-rule mt-5 w-28' aria-hidden />
          <p className='mt-5 max-w-prose text-lead text-ink-muted'>
            IHSB graduates study and work in {destinations.length} cities on this map alone. Drag the globe to follow
            where they went.
          </p>

          <ul className='mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2'>
            {byCity.slice(0, 8).map(({ destination, person }) => (
              <li key={destination.label} className='border-t border-line pt-3'>
                <p className='font-semibold text-ink'>{destination.label}</p>
                {person && (
                  <p className='text-sm text-ink-subtle'>
                    {person.name}, {person.description}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <ButtonLink href='/achievements/alumni' variant='inverse' className='mt-9'>
            Meet our alumni
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
