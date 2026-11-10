// data/navigation.ts
// Navigation menu structure for easy updates

export interface SubLink {
  title: string
  href: string
  /** One line shown under the link in the desktop mega-menu */
  description?: string
}

export interface MenuItem {
  title: string
  href?: string
  /** Short introduction shown at the side of the mega-menu panel */
  blurb?: string
  /** Card shown at the side of the mega-menu panel */
  featured?: { title: string; description: string; href: string; image: string }
  subLinks?: SubLink[]
}

export const navigationMenu: MenuItem[] = [
  {
    title: 'Academics',
    blurb: 'The Cambridge pathway from the early years to A Level.',
    featured: {
      title: 'Cambridge results',
      description: 'See this year\u2019s IGCSE, AS and A Level high achievers.',
      href: '/achievements/academicachievement',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=70'
    },
    subLinks: [
      { title: 'Curriculum', href: '/academics/curriculum', description: 'What is taught at each stage' },
      { title: 'Academic Calendar', href: '/academics/calendar', description: 'Term dates, exams and holidays' },
      { title: 'Scholarship', href: '/academics/scholarship', description: 'Merit awards and how to apply' },
      { title: 'Publications', href: '/academics/publication', description: 'The Hopian and other school magazines' }
    ]
  },
  {
    title: 'Admissions',
    blurb: 'How to join IHSB, step by step.',
    featured: {
      title: 'Apply online',
      description: 'The application takes about 15 minutes. Have your documents ready.',
      href: '/admission/apply',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70'
    },
    subLinks: [
      { title: 'Admission Procedure', href: '/admission/admissionprocedure', description: 'Requirements, assessment and timeline' },
      { title: 'Fees', href: '/admission/fees', description: 'Tuition and other charges' },
      { title: 'Apply Online', href: '/admission/apply', description: 'Start an application now' }
    ]
  },
  {
    title: 'Achievements',
    blurb: 'What our students and graduates have gone on to do.',
    featured: {
      title: 'Alumni worldwide',
      description: 'Where IHSB graduates study and work today.',
      href: '/achievements/alumni',
      image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=70'
    },
    subLinks: [
      { title: 'Academic Achievements', href: '/achievements/academicachievement', description: 'Cambridge IGCSE, AS and A Level results' },
      { title: 'Sports', href: '/achievements/sports', description: 'Trophies, tournaments and team results' },
      { title: 'Alumni', href: '/achievements/alumni', description: 'Graduates around the world and their stories' }
    ]
  },
  {
    title: 'Campus Life',
    blurb: 'Three campuses in Dhaka, and a full life beyond lessons.',
    featured: {
      title: 'Upcoming events',
      description: 'Open days, fairs, matches and ceremonies.',
      href: '/events',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=70'
    },
    subLinks: [
      { title: 'Uttara Senior Section', href: '/uttarasenior', description: 'IGCSE and A Levels' },
      { title: 'Uttara Junior Section', href: '/uttarajunior', description: 'Preschool and primary years' },
      { title: 'Gulshan Primary & Middle Section', href: '/gulshanbranch', description: 'Preschool to middle school in Gulshan 2' },
      { title: 'Clubs', href: '/academics/clubs', description: 'Student-run clubs and societies' },
      { title: 'Extracurricular Activities', href: '/academics/extracurricular', description: 'Sport, arts and service' },
      { title: 'Events', href: '/events', description: 'What is on this term' }
    ]
  },
  {
    title: 'About',
    blurb: 'An English-medium school in Dhaka since 1996.',
    featured: {
      title: 'Visit us',
      description: 'Book a campus tour or ask the admissions office a question.',
      href: '/contact',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=70'
    },
    subLinks: [
      { title: 'About IHSB', href: '/about', description: 'Our story, mission and leadership' },
      { title: 'News', href: '/news', description: 'Stories from the school community' },
      { title: 'Announcements', href: '/announcements', description: 'Notices for parents and students' },
      { title: 'Contact', href: '/contact', description: 'Addresses, phone numbers and a map' }
    ]
  }
]

export const footerNavigation = {
  school: [
    { title: 'About IHSB', href: '/about' },
    { title: 'News', href: '/news' },
    { title: 'Events', href: '/events' },
    { title: 'Announcements', href: '/announcements' },
    { title: 'Contact', href: '/contact' }
  ],
  academics: [
    { title: 'Curriculum', href: '/academics/curriculum' },
    { title: 'Academic Calendar', href: '/academics/calendar' },
    { title: 'Clubs', href: '/academics/clubs' },
    { title: 'Scholarship', href: '/academics/scholarship' },
    { title: 'Academic Achievements', href: '/achievements/academicachievement' }
  ],
  admissions: [
    { title: 'Admission Procedure', href: '/admission/admissionprocedure' },
    { title: 'Fees', href: '/admission/fees' },
    { title: 'Apply Online', href: '/admission/apply' }
  ]
}
