import type {
  AlumniStoryDocument,
  AlumniYearStatsDocument,
  FeaturedAlumniDocument
} from '@/lib/database/alumni'
import { filler } from './filler.generated'
import { daysFromNow, ts, yearFromNow } from './helpers'
import { img, portraits } from './images'

// ==================== Featured alumni ====================

type AlumniSeed = Omit<
  FeaturedAlumniDocument,
  'id' | 'achievement' | 'graduationYear' | 'email' | 'linkedin' | 'createdAt' | 'updatedAt'
> & { slug: string; yearsAgo: number }

const alumniSeeds: AlumniSeed[] = [
  {
    slug: 'tasnim-rahman',
    name: 'Dr. Tasnim Rahman',
    description: 'Paediatric Cardiologist',
    yearsAgo: 16,
    imageUrl: portraits.woman1,
    company: 'Great Ormond Street Hospital',
    location: 'London, United Kingdom',
    featured: true
  },
  {
    slug: 'arif-chowdhury',
    name: 'Arif Chowdhury',
    description: 'Senior Software Engineer',
    yearsAgo: 11,
    imageUrl: portraits.man1,
    company: 'Google',
    location: 'Zurich, Switzerland',
    featured: true
  },
  {
    slug: 'nadia-islam',
    name: 'Nadia Islam',
    description: 'Climate Policy Analyst',
    yearsAgo: 9,
    imageUrl: portraits.woman2,
    company: 'United Nations Development Programme',
    location: 'New York, United States',
    featured: true
  },
  {
    slug: 'emre-yilmaz',
    name: 'Emre Yılmaz',
    description: 'Structural Engineer',
    yearsAgo: 13,
    imageUrl: portraits.man2,
    company: 'Arup',
    location: 'Istanbul, Türkiye',
    featured: true
  },
  {
    slug: 'sadia-karim',
    name: 'Sadia Karim',
    description: 'Founder & CEO',
    yearsAgo: 12,
    imageUrl: portraits.woman3,
    company: 'ShikhoBondhu EdTech',
    location: 'Dhaka, Bangladesh',
    featured: true
  },
  {
    slug: 'rohan-das',
    name: 'Rohan Das',
    description: 'Investment Associate',
    yearsAgo: 8,
    imageUrl: portraits.man3,
    company: 'Temasek',
    location: 'Singapore',
    featured: true
  },
  {
    slug: 'maisha-ahmed',
    name: 'Maisha Ahmed',
    description: 'PhD Researcher in Machine Learning',
    yearsAgo: 6,
    imageUrl: portraits.woman4,
    company: 'University of Toronto',
    location: 'Toronto, Canada',
    featured: false
  },
  {
    slug: 'kenji-watanabe',
    name: 'Kenji Watanabe',
    description: 'Automotive Design Engineer',
    yearsAgo: 10,
    imageUrl: portraits.man4,
    company: 'Toyota Motor Corporation',
    location: 'Nagoya, Japan',
    featured: false
  },
  {
    slug: 'farah-hossain',
    name: 'Farah Hossain',
    description: 'Barrister-at-Law',
    yearsAgo: 14,
    imageUrl: portraits.woman5,
    company: 'Hossain & Associates',
    location: 'Dhaka, Bangladesh',
    featured: false
  },
  {
    slug: 'omar-siddique',
    name: 'Omar Siddique',
    description: 'Renewable Energy Consultant',
    yearsAgo: 7,
    imageUrl: portraits.man5,
    company: 'Ørsted',
    location: 'Copenhagen, Denmark',
    featured: false
  },
  {
    slug: 'aisha-noor',
    name: 'Aisha Noor',
    description: 'Medical Student',
    yearsAgo: 3,
    imageUrl: portraits.woman6,
    company: 'Monash University',
    location: 'Melbourne, Australia',
    featured: false
  },
  {
    slug: 'zoya-malik',
    name: 'Zoya Malik',
    description: 'Product Designer',
    yearsAgo: 5,
    imageUrl: portraits.woman7,
    company: 'Careem',
    location: 'Dubai, United Arab Emirates',
    featured: false
  }
]

export const mockFeaturedAlumni: FeaturedAlumniDocument[] = alumniSeeds.map(({ slug, yearsAgo, ...alumni }, index) => {
  const graduationYear = yearFromNow(-yearsAgo)
  const created = daysFromNow(-(20 + index * 9), 6)
  return {
    id: `mock-alumni-${slug}`,
    ...alumni,
    achievement: `Graduated ${graduationYear}`,
    graduationYear,
    email: `${slug.replace('-', '.')}@alumni.ihsb.example`,
    linkedin: `https://www.linkedin.com/in/${slug}-${filler.handles[index]}`,
    createdAt: ts(created),
    updatedAt: ts(created)
  }
})

// ==================== Alumni stories ====================

type StorySeed = Omit<AlumniStoryDocument, 'id' | 'date' | 'createdAt' | 'updatedAt'> & {
  slug: string
  daysAgo: number
}

const storySeeds: StorySeed[] = [
  {
    slug: 'from-uttara-to-great-ormond-street',
    title: 'From the Uttara biology lab to Great Ormond Street',
    excerpt:
      'Dr. Tasnim Rahman on the teacher who lent her a stethoscope in Grade 9 and why she still visits the school every winter.',
    content:
      'I was fourteen when Mrs. Sultana let me borrow the model heart from the biology lab over a weekend. I took it apart at the dining table and could not put it back together. On Sunday she did not scold me; she sat with me after school and we rebuilt it valve by valve.\n\nThat patience is what I remember most about IHSB. The A Level results opened the door to medical school in London, but it was the habit of asking "why does it work like that?" that carried me through seven years of training.\n\nI come back every winter to speak to the Grade 11 science students. My advice is always the same: learn the basics so well that you can explain them to a ten-year-old.',
    author: 'Dr. Tasnim Rahman',
    authorRole: 'Paediatric Cardiologist, London',
    imageUrl: img.scienceLab,
    daysAgo: 18,
    published: true,
    featured: true
  },
  {
    slug: 'what-debate-taught-me-about-code',
    title: 'What the debate club taught me about writing code',
    excerpt:
      'Arif Chowdhury explains how arguing both sides of a motion made him a better engineer at Google.',
    content:
      'People are surprised when I say the most useful thing I did at school was debating. In a code review you have to make your case clearly, listen to the counter-argument and change your mind quickly when you are wrong. That is a debate round.\n\nI joined the club in Grade 8 because my friend needed a third speaker. By Grade 11 we were travelling to tournaments in Chattogram and Kolkata. The computer science lab was where I learned to program; the debate room was where I learned to think.',
    author: 'Arif Chowdhury',
    authorRole: 'Senior Software Engineer, Zurich',
    imageUrl: img.technology,
    daysAgo: 41,
    published: true,
    featured: true
  },
  {
    slug: 'building-an-edtech-company-in-dhaka',
    title: 'Building an education company in the city that raised me',
    excerpt:
      'Sadia Karim returned from university abroad to start a learning platform now used by 300,000 students across Bangladesh.',
    content:
      'After graduating I had an offer to stay in Singapore. I came home instead, because the problem I cared about was here: bright students outside Dhaka with no access to good teaching.\n\nWe started with three teachers recording lessons in my parents\' living room. Two of them were my own teachers from IHSB. Today the platform has more than three hundred thousand learners.\n\nThe school taught me that excellence and compassion are not opposites. That sentence is on the wall of our office.',
    author: 'Sadia Karim',
    authorRole: 'Founder & CEO, ShikhoBondhu EdTech',
    imageUrl: img.onlineLearning,
    daysAgo: 63,
    published: true,
    featured: true
  },
  {
    slug: 'model-un-to-the-real-un',
    title: 'From Model UN to the real United Nations',
    excerpt:
      'Nadia Islam drafted her first resolution in the IHSB auditorium. Now she works on climate adaptation policy in New York.',
    content:
      'My first committee was the General Assembly at a school conference; I represented Tuvalu and spent a week reading about sea-level rise. I did not realise I was choosing a career.\n\nAt UNDP I work with governments on climate adaptation plans, including Bangladesh\'s. When negotiations get difficult I still use what our MUN adviser taught us: find the sentence everyone can agree on and build from there.',
    author: 'Nadia Islam',
    authorRole: 'Climate Policy Analyst, New York',
    imageUrl: img.conference,
    daysAgo: 90,
    published: true,
    featured: false
  },
  {
    slug: 'a-turkish-engineer-who-grew-up-in-dhaka',
    title: 'A Turkish engineer who grew up in Dhaka',
    excerpt:
      'Emre Yılmaz spent twelve years at IHSB. He writes about friendship, football and designing earthquake-resistant bridges.',
    content:
      'I arrived in Dhaka at the age of six without a word of Bangla or English. By Grade 3 I was translating for my parents at the market.\n\nIHSB was the kind of school where the football team had players from five countries and nobody thought it was unusual. That is still how I think a team should look. Today I design bridges in a seismic zone, and my closest colleagues are friends I made on the Uttara football pitch.',
    author: 'Emre Yılmaz',
    authorRole: 'Structural Engineer, Istanbul',
    imageUrl: img.football,
    daysAgo: 118,
    published: true,
    featured: false
  },
  {
    slug: 'first-year-at-medical-school',
    title: 'Notes from my first year at medical school',
    excerpt:
      'Recent graduate Aisha Noor shares what surprised her about studying in Melbourne and what she wishes she had known in Grade 12.',
    content:
      'Nobody tells you that the hardest part of first year is not the anatomy; it is cooking dinner after a ten-hour day.\n\nAcademically I felt ready. A Level Biology and Chemistry at IHSB covered a large part of the first-semester content. What I had to learn was independence. My advice to the current Grade 12s: learn three recipes and how to ask for help. Both will save you.',
    author: 'Aisha Noor',
    authorRole: 'Medical Student, Melbourne',
    imageUrl: img.studying,
    daysAgo: 139,
    published: true,
    featured: false
  },
  {
    slug: 'why-i-mentor-scholarship-students',
    title: 'Why I mentor IHSB scholarship students',
    excerpt:
      'Rohan Das attended IHSB on a full merit scholarship. He now funds two scholarships a year and mentors the recipients.',
    content:
      'A scholarship changed what my family thought was possible. I was the first person in my family to study abroad.\n\nEvery year I speak to the new scholarship students by video call. I tell them the award is not a debt to repay to me or to the school. It is something to pass on.',
    author: 'Rohan Das',
    authorRole: 'Investment Associate, Singapore',
    imageUrl: img.books,
    daysAgo: 161,
    published: true,
    featured: false
  },
  {
    slug: 'alumni-reunion-recap-draft',
    title: 'Alumni reunion recap (draft)',
    excerpt: 'Draft write-up of the winter reunion. Photos to be added before publishing.',
    content: 'More than 180 alumni from 21 graduating classes returned to the Uttara campus for the winter reunion.',
    author: 'Alumni Relations Office',
    authorRole: 'IHSB',
    imageUrl: img.eventHall,
    daysAgo: 5,
    published: false,
    featured: false
  }
]

export const mockAlumniStories: AlumniStoryDocument[] = storySeeds.map(({ slug, daysAgo, ...story }) => {
  const date = daysFromNow(-daysAgo, 7)
  return {
    id: `mock-story-${slug}`,
    ...story,
    date,
    createdAt: ts(date),
    updatedAt: ts(date)
  }
})

// ==================== Graduates by year ====================

const GRADUATE_COUNTS = ['168', '154', '147', '139', '126', '118', '104', '96', '89', '77']

export const mockAlumniYearStats: AlumniYearStatsDocument[] = GRADUATE_COUNTS.map((count, index) => {
  const year = String(yearFromNow(-index))
  const created = daysFromNow(-(30 + index), 6)
  return {
    id: `mock-alumni-stats-${year}`,
    year,
    count,
    autoCalculated: false,
    createdAt: ts(created),
    updatedAt: ts(created)
  }
})
