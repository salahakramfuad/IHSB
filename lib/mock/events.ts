import type { Event } from '@/data/events'
import { annualOffset, daysFromNow } from './helpers'
import { img } from './images'

type Seed = Omit<Event, 'date'> & { inDays: number }

const seeds: Seed[] = [
  {
    id: 'mock-event-open-day',
    title: 'Admissions Open Day',
    description:
      'Tour the campus, sit in on a sample lesson and meet the Principal, section heads and current parents. Our admissions team will explain the application process, assessment dates and scholarship options for the coming academic year.',
    inDays: 11,
    time: '10:00 AM - 1:00 PM',
    location: 'Uttara Senior Section, Main Auditorium',
    image: img.campusBuilding,
    category: 'admission',
    featured: true,
    registrationRequired: true,
    registrationUrl: '/admission/apply'
  },
  {
    id: 'mock-event-victory-day',
    title: 'Victory Day Commemoration',
    description:
      'The school community gathers to honour the martyrs of 1971 with a flag-raising ceremony, a wreath-laying at the school memorial, patriotic songs by the choir and a student-led exhibition on the Liberation War.',
    inDays: annualOffset(12, 16, 36),
    time: '8:00 AM - 11:00 AM',
    location: 'Uttara Campus, Central Courtyard',
    image: img.eventHall,
    category: 'cultural',
    featured: true
  },
  {
    id: 'mock-event-science-fair',
    title: 'Annual Science & Innovation Fair',
    description:
      'Over 120 student projects in physics, chemistry, biology, computing and environmental science. Guest judges from BUET and Dhaka University will award prizes in junior and senior categories. Families are welcome from midday.',
    inDays: 24,
    time: '9:00 AM - 4:00 PM',
    location: 'Uttara Senior Section, Science Wing',
    image: img.scienceLab,
    category: 'academic',
    featured: true
  },
  {
    id: 'mock-event-ihsbmun',
    title: 'IHSBMUN: Model United Nations Conference',
    description:
      'Three days of debate across six committees, hosted by the IHSB MUN Club. Delegates from schools across Dhaka and Chattogram will tackle climate migration, digital rights and regional water security.',
    inDays: 45,
    time: '9:00 AM - 5:00 PM',
    location: 'Uttara Senior Section',
    image: img.conference,
    category: 'academic',
    featured: true,
    registrationRequired: true,
    registrationUrl: '/contact'
  },
  {
    id: 'mock-event-sports-day',
    title: 'Annual Sports Day',
    description:
      'Track and field finals, house relays and the march-past. Four houses compete for the Champions Shield, followed by the prize-giving ceremony with the Chief Guest.',
    inDays: 58,
    time: '8:00 AM - 3:00 PM',
    location: 'IHSB Sports Ground, Uttara',
    image: img.athleticsTrack,
    category: 'sports',
    featured: true
  },
  {
    id: 'mock-event-parent-teacher',
    title: 'Parent-Teacher Conference (Grades 6-10)',
    description:
      'Individual fifteen-minute meetings with subject teachers to review first-term progress reports. Appointment slots are booked through the class teacher.',
    inDays: 17,
    time: '2:00 PM - 6:00 PM',
    location: 'Uttara Senior Section & Gulshan Middle Section',
    image: img.meeting,
    category: 'academic',
    registrationRequired: true,
    registrationUrl: '/contact'
  },
  {
    id: 'mock-event-football-final',
    title: 'Inter-House Football Final',
    description:
      'Red House meet Blue House in the final of the inter-house football tournament. Kick-off follows the junior five-a-side exhibition match.',
    inDays: 6,
    time: '3:30 PM',
    location: 'IHSB Sports Ground, Uttara',
    image: img.football,
    category: 'sports'
  },
  {
    id: 'mock-event-university-fair',
    title: 'International University Fair',
    description:
      'Representatives from more than thirty universities in the UK, Canada, Australia, Malaysia and Türkiye meet students and parents from Grades 9 to 12. Sessions cover applications, scholarships and personal statements.',
    inDays: 72,
    time: '11:00 AM - 4:00 PM',
    location: 'Uttara Senior Section, Main Auditorium',
    image: img.lectureHall,
    category: 'academic',
    featured: false
  },
  {
    id: 'mock-event-independence-day',
    title: 'Independence Day Art & Essay Showcase',
    description:
      'Winning entries from the inter-campus art and essay competition go on display, with readings by the authors and a short documentary produced by the Media Club.',
    inDays: annualOffset(3, 26, 86),
    time: '10:00 AM - 12:30 PM',
    location: 'Gulshan Primary & Middle Section',
    image: img.art,
    category: 'cultural'
  },
  {
    id: 'mock-event-scholarship-test',
    title: 'Scholarship Assessment Day',
    description:
      'Written assessments in English and Mathematics followed by interviews for applicants to the merit scholarship programme. Candidates should bring their admit card and last two report cards.',
    inDays: 33,
    time: '9:00 AM - 1:00 PM',
    location: 'Uttara Senior Section, Examination Hall',
    image: img.examDesk,
    category: 'admission',
    registrationRequired: true,
    registrationUrl: '/academics/scholarship'
  },
  // ---- Past events ----
  {
    id: 'mock-event-pohela-boishakh',
    title: 'Pohela Boishakh Celebration',
    description:
      'Bengali New Year celebrated with a Mangal Shobhajatra, folk music, alpona painting and traditional food stalls run by students and parents.',
    inDays: annualOffset(4, 14, -160),
    time: '9:00 AM - 1:00 PM',
    location: 'All campuses',
    image: img.music,
    category: 'cultural'
  },
  {
    id: 'mock-event-graduation',
    title: 'Graduation Ceremony: Class of the Year',
    description:
      'A Level graduates received their certificates in front of families and faculty. The valedictory address was delivered by the Head Girl, and the Chairman presented the Award for All-Round Excellence.',
    inDays: -120,
    time: '4:00 PM - 7:00 PM',
    location: 'Uttara Senior Section, Main Auditorium',
    image: img.graduation,
    category: 'academic',
    featured: true
  },
  {
    id: 'mock-event-book-week',
    title: 'Book Week & Author Visit',
    description:
      'A week of readings, a second-hand book fair and a creative writing workshop led by a visiting children\'s author. Primary students came dressed as their favourite characters on the final day.',
    inDays: -47,
    time: '8:30 AM - 2:00 PM',
    location: 'Uttara Preschool & Primary Section, Library',
    image: img.library,
    category: 'academic'
  },
  {
    id: 'mock-event-basketball-invitational',
    title: 'IHSB Basketball Invitational',
    description:
      'Eight schools competed over two days in boys\' and girls\' divisions in the indoor sports hall. IHSB girls reached the final; the boys finished third.',
    inDays: -75,
    time: '9:00 AM - 5:00 PM',
    location: 'Indoor Sports Hall, Uttara',
    image: img.basketball,
    category: 'sports'
  }
]

export const mockEvents: Event[] = seeds.map(({ inDays, ...event }) => ({
  ...event,
  featured: event.featured ?? false,
  registrationRequired: event.registrationRequired ?? false,
  date: daysFromNow(inDays, 3)
}))
