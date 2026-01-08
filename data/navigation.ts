// data/navigation.ts
// Navigation menu structure for easy updates

export interface SubLink {
  title: string
  href: string
}

export interface MenuItem {
  title: string
  href?: string
  subLinks?: SubLink[]
}

export const navigationMenu: MenuItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Branches',
    subLinks: [
      { title: 'Uttara Senior Section', href: '/uttarasenior' },
      { title: 'Uttara Junior Section', href: '/uttarajunior' },
      { title: 'Gulshan Primary & Middle Section', href: '/gulshanbranch' }
    ]
  },
  {
    title: 'Achievements',
    subLinks: [
      { title: 'Sports', href: '/achievements/sports' },
      {
        title: 'Academic Achievements',
        href: '/achievements/academicachievement'
      },
      { title: 'Alumni', href: '/achievements/alumni' }
    ]
  },
  {
    title: 'Academics',
    subLinks: [
      { title: 'Curriculum', href: '/academics/curriculumn' },
      { title: 'Academic Calendar', href: '/academics/calendar' },
      {
        title: 'Extracurricular Activities',
        href: '/academics/extracurricular'
      },
      { title: 'Clubs', href: '/academics/clubs' },
      { title: 'Scholarship', href: '/academics/scholarship' },
      { title: 'Publications', href: '/academics/publication' }
    ]
  },
  {
    title: 'Admissions',
    subLinks: [
      {
        title: 'Admission Procedure',
        href: '/admission/admissionprocedure'
      },
      { title: 'Fees', href: '/admission/fees' },
      { title: 'Apply Online', href: '/admission/apply' }
    ]
  },
  { title: 'About', href: '/about' },
  { title: 'Events', href: '/events' },
  { title: 'Contact', href: '/contact' }
]

