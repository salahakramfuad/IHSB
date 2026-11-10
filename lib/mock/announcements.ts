import type { AnnouncementDocument } from '@/lib/database/announcements'
import { daysFromNow, ts } from './helpers'
import { img } from './images'

type Seed = Omit<AnnouncementDocument, 'createdAt' | 'updatedAt' | 'expiresAt'> & {
  postedDaysAgo: number
  expiresInDays?: number
}

const seeds: Seed[] = [
  {
    id: 'mock-announcement-admissions-open',
    title: 'Admissions open for the next academic year',
    content:
      'Applications are now being accepted for Playgroup to Grade 11 at the Uttara, Gulshan and Chattogram campuses. Seats in Grades 6 and 9 are limited. Apply online or visit the Admissions Office between 9:00 AM and 3:00 PM, Sunday to Thursday.',
    image: img.campusBuilding,
    priority: 'high',
    featured: true,
    isActive: true,
    postedDaysAgo: 2,
    expiresInDays: 80
  },
  {
    id: 'mock-announcement-victory-day',
    title: 'Victory Day: school closed, commemoration programme in the morning',
    content:
      'Classes are suspended on Victory Day. Students taking part in the flag-raising ceremony and cultural programme should arrive in full uniform by 7:30 AM. Parents are warmly invited to attend.',
    priority: 'medium',
    featured: true,
    isActive: true,
    postedDaysAgo: 4,
    expiresInDays: 40
  },
  {
    id: 'mock-announcement-mock-exams',
    title: 'IGCSE and A Level mock examination timetable published',
    content:
      'The mock examination timetable for Grades 10, 11 and 12 is available from class teachers and on the student portal. Mock exams follow Cambridge regulations: candidates must be seated ten minutes before the start time.',
    priority: 'high',
    featured: true,
    isActive: true,
    postedDaysAgo: 6,
    expiresInDays: 45
  },
  {
    id: 'mock-announcement-scholarship',
    title: 'Merit scholarship applications close soon',
    content:
      'Students entering Grades 6 to 11 may apply for merit scholarships covering 25% to 100% of tuition. Submit the application form with the last two report cards to the Admissions Office. Shortlisted candidates will be invited to the Scholarship Assessment Day.',
    image: img.books,
    priority: 'medium',
    featured: false,
    isActive: true,
    postedDaysAgo: 9,
    expiresInDays: 30
  },
  {
    id: 'mock-announcement-winter-uniform',
    title: 'Winter uniform from next Sunday',
    content:
      'All students should wear the winter uniform (navy blazer or school sweater) from next Sunday. Items are available from the school store on both the Uttara and Gulshan campuses.',
    priority: 'low',
    featured: false,
    isActive: true,
    postedDaysAgo: 11,
    expiresInDays: 60
  },
  {
    id: 'mock-announcement-ptc',
    title: 'Parent-Teacher Conference: book your appointment',
    content:
      'First-term progress reports will be sent home on Thursday. Appointment slots for the Parent-Teacher Conference can be booked through your child\'s class teacher until the day before the conference.',
    priority: 'medium',
    featured: false,
    isActive: true,
    postedDaysAgo: 13,
    expiresInDays: 18
  },
  {
    id: 'mock-announcement-mun-registration',
    title: 'IHSBMUN delegate registration is open',
    content:
      'Students in Grades 8 to 12 can register as delegates for IHSBMUN. Committee preferences are allocated on a first-come basis. Training sessions for first-time delegates run every Thursday after school.',
    image: img.conference,
    priority: 'low',
    featured: false,
    isActive: true,
    postedDaysAgo: 16,
    expiresInDays: 40
  },
  {
    id: 'mock-announcement-transport',
    title: 'Revised school bus routes for Uttara and Mirpur',
    content:
      'Because of road works on Dhaka-Mymensingh Road, buses on routes 3, 5 and 8 will leave ten minutes earlier in the morning until further notice. Updated pick-up times have been sent by SMS.',
    priority: 'medium',
    featured: false,
    isActive: true,
    postedDaysAgo: 20
  },
  {
    id: 'mock-announcement-library-hours',
    title: 'Extended library hours during the exam period',
    content:
      'The Senior Section library will stay open until 6:00 PM on weekdays during the mock examination period. A teacher will be on duty for supervised study.',
    priority: 'low',
    featured: false,
    isActive: true,
    postedDaysAgo: 27
  },
  {
    id: 'mock-announcement-summer-camp',
    title: 'Summer camp registration (closed)',
    content:
      'Registration for the summer STEM and sports camp has closed. Thank you to the 240 students who took part.',
    priority: 'low',
    featured: false,
    isActive: false,
    postedDaysAgo: 150,
    expiresInDays: -110
  }
]

export const mockAnnouncements: AnnouncementDocument[] = seeds.map(
  ({ postedDaysAgo, expiresInDays, ...announcement }) => {
    const posted = daysFromNow(-postedDaysAgo, 3)
    return {
      ...announcement,
      ...(expiresInDays !== undefined ? { expiresAt: daysFromNow(expiresInDays, 12) } : {}),
      createdAt: ts(posted),
      updatedAt: ts(posted)
    }
  }
)
