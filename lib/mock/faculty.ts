import { portraits } from './images'
import type { FacultyMember } from './types'

export const mockFaculty: FacultyMember[] = [
  { id: 'mock-faculty-farhana-rahman', name: 'Dr. Farhana Rahman', role: 'Principal', photo: portraits.woman4 },
  { id: 'mock-faculty-mehmet-aydin', name: 'Mehmet Aydın', role: 'Vice Principal, Academics', photo: portraits.man4 },
  { id: 'mock-faculty-shahana-sultana', name: 'Shahana Sultana', role: 'Head of Senior Section', photo: portraits.woman5 },
  { id: 'mock-faculty-james-whitfield', name: 'James Whitfield', role: 'IGCSE Coordinator', photo: portraits.man5 },
  { id: 'mock-faculty-rezwana-karim', name: 'Rezwana Karim', role: 'A Levels Coordinator', photo: portraits.woman1 },
  { id: 'mock-faculty-anirban-dutta', name: 'Anirban Dutta', role: 'Head of Mathematics', photo: portraits.man1 },
  { id: 'mock-faculty-ayse-korkmaz', name: 'Ayşe Korkmaz', role: 'Head of Sciences', photo: portraits.woman2 },
  { id: 'mock-faculty-tariq-mahmud', name: 'Tariq Mahmud', role: 'Head of English', photo: portraits.man2 },
  { id: 'mock-faculty-lubna-yasmin', name: 'Lubna Yasmin', role: 'Head of Primary Section', photo: portraits.woman3 },
  { id: 'mock-faculty-mahmudul-hasan', name: 'Mahmudul Hasan', role: 'Director of Sports', photo: portraits.man3 },
  { id: 'mock-faculty-sumaiya-akter', name: 'Sumaiya Akter', role: 'Admissions & Student Affairs Lead', photo: portraits.woman6 },
  { id: 'mock-faculty-grace-mensah', name: 'Grace Mensah', role: 'University & Careers Counsellor', photo: portraits.woman7 }
]
