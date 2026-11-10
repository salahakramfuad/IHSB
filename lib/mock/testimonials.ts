import { portraits } from './images'
import type { Testimonial } from './types'

export const mockTestimonials: Testimonial[] = [
  {
    id: 'mock-testimonial-01',
    name: 'Ayesha Siddiqua',
    avatar: portraits.woman1,
    text: 'My teachers stayed after school for weeks before the A Level exams. I never felt I was preparing alone, and that made all the difference.',
    grade: 'Grade 12'
  },
  {
    id: 'mock-testimonial-02',
    name: 'Mr. & Mrs. Chowdhury',
    avatar: portraits.man3,
    text: 'We moved back to Dhaka from Toronto and worried about the transition. Within a month our daughter was in the debate club and speaking Bangla with her friends.',
    grade: 'Parents, Grade 7'
  },
  {
    id: 'mock-testimonial-03',
    name: 'Yusuf Demir',
    avatar: portraits.man2,
    text: 'I play football with friends from six countries. Here, being international is not something we talk about. It is simply how the school is.',
    grade: 'Grade 11'
  },
  {
    id: 'mock-testimonial-04',
    name: 'Nasrin Sultana',
    avatar: portraits.woman5,
    text: 'The class teacher calls us before a small problem becomes a big one. That kind of attention is rare, and it is why both our children are at IHSB.',
    grade: 'Parent, Grade 3 & KG 2'
  },
  {
    id: 'mock-testimonial-05',
    name: 'Tahsin Ahmed',
    avatar: portraits.man5,
    text: 'Our science fair project started as a question in class. Our physics teacher gave us the lab every Thursday for three months to build it properly.',
    grade: 'Grade 9'
  },
  {
    id: 'mock-testimonial-06',
    name: 'Priya Sharma',
    avatar: portraits.woman3,
    text: 'The university counsellor helped my son plan from Grade 9. He has offers from three universities in the UK, two of them with scholarships.',
    grade: 'Parent, Grade 12'
  },
  {
    id: 'mock-testimonial-07',
    name: 'Samira Haque',
    avatar: portraits.woman6,
    text: 'Balancing basketball and AS Levels is hard, but coaches and teachers actually talk to each other here, so I have never had to choose.',
    grade: 'Grade 11'
  },
  {
    id: 'mock-testimonial-08',
    name: 'Arif Chowdhury',
    avatar: portraits.man1,
    text: 'Ten years after graduating, the habits I learned at IHSB, asking good questions and finishing what I start, are the ones I rely on every day.',
    grade: 'Alumnus'
  },
  {
    id: 'mock-testimonial-09',
    name: 'Hakan Demir',
    avatar: portraits.man4,
    text: 'As an expatriate family we wanted a school with real academic standards and a warm community. We found both on the first visit.',
    grade: 'Parent, Grade 9'
  }
]
