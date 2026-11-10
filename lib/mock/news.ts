import type { NewsDocument } from '@/lib/database/news'
import { annualOffset, daysFromNow, ts } from './helpers'
import { img, picsum } from './images'

type Seed = Omit<NewsDocument, 'date' | 'createdAt' | 'updatedAt'> & { daysAgo: number }

const seeds: Seed[] = [
  {
    id: 'mock-news-cambridge-results',
    title: 'IHSB students earn 41 A* and A grades in the Cambridge June series',
    description:
      'Our IGCSE and A Level candidates have delivered the strongest results in the school\'s history. Across the Uttara and Gulshan campuses, 41 students secured straight A* and A grades, and three candidates achieved the highest mark in Bangladesh in Mathematics, Physics and Accounting.\n\nPrincipal Dr. Farhana Rahman congratulated the cohort at a special assembly, crediting "two years of steady, honest work by students, and teachers who refused to let anyone settle for less than their best." Detailed subject statistics are available from the Examinations Office.',
    photos: [img.graduation, img.examDesk, img.studying],
    category: 'news',
    daysAgo: 88
  },
  {
    id: 'mock-news-science-fair',
    title: 'Solar-powered water purifier wins the Inter-School Science Fair',
    description:
      'A Grade 9 team from the Uttara Senior Section took first place at the Dhaka Inter-School Science Fair with a low-cost, solar-powered water purifier designed for flood-affected communities. Tahsin Ahmed, Maliha Chowdhury and Daniel Okafor built the prototype for under 2,500 taka using recycled acrylic and a small photovoltaic panel.\n\nJudges from BUET praised the team for field-testing the device in Kurigram before the competition. The project now advances to the national round in January.',
    photos: [img.scienceLab, img.robotics, img.technology],
    category: 'news',
    daysAgo: 23
  },
  {
    id: 'mock-news-football-champions',
    title: 'Senior football team lifts the Dhaka International Schools Cup',
    description:
      'IHSB are champions of the Dhaka International Schools Cup after a 2-1 win in a tense final at the Uttara ground. Captain Rafsan Karim opened the scoring from a free kick before Yusuf Demir sealed the title with a header in the 78th minute.\n\nIt is the school\'s third title in five seasons. Coach Mahmudul Hasan dedicated the win to the Grade 12 players competing in their final school tournament.',
    photos: [img.football, img.footballBall, img.stadium],
    category: 'sports',
    daysAgo: 12
  },
  {
    id: 'mock-news-mun-delegation',
    title: 'IHSB delegation wins Best Large Delegation at Dhaka Model United Nations',
    description:
      'Twenty-two delegates represented IHSB at the Dhaka International Model United Nations conference, returning with the Best Large Delegation award and six individual honours. Ayesha Siddiqua (Grade 11) was named Best Delegate in the Security Council for her work on a draft resolution on climate-displaced communities.\n\nThe MUN Club meets every Thursday and is now preparing to host IHSBMUN on our own campus next term.',
    photos: [img.conference, img.speaker, img.meeting],
    category: 'news',
    daysAgo: 37
  },
  {
    id: 'mock-news-debate-nationals',
    title: 'Debate team reaches the national final of the English Parliamentary Championship',
    description:
      'After five preliminary rounds and two knockout debates, the IHSB debate team has qualified for the grand final of the National English Parliamentary Debate Championship. Speakers Nabila Hossain, Arjun Mehta and Zara Islam argued motions ranging from data privacy to the future of public transport in Dhaka.\n\nThe final will be held at the Bangladesh National Museum auditorium. Supporters are welcome; seats can be reserved through the front office.',
    photos: [img.speaker, img.eventHall],
    category: 'news',
    daysAgo: 6
  },
  {
    id: 'mock-news-cricket-tournament',
    title: 'Under-16 cricketers finish runners-up in the Gulshan Schools T20',
    description:
      'The Under-16 cricket side went unbeaten through the group stage of the Gulshan Schools T20 before falling eleven runs short in the final. Opening batter Shadman Rahim was named Player of the Tournament with 214 runs, including an unbeaten 76 in the semi-final.\n\nThe squad returns to nets next week ahead of the winter fixtures.',
    photos: [img.cricket, img.sportsField],
    category: 'sports',
    daysAgo: 51
  },
  {
    id: 'mock-news-basketball-league',
    title: 'Girls\' basketball team opens the league season with three straight wins',
    description:
      'The girls\' senior basketball team has started the Inter-School Basketball League with wins over three Dhaka schools. Point guard Samira Haque is averaging 14 points a game, and the team has conceded the fewest points in the league so far.\n\nHome games are played in the indoor sports hall on Saturday mornings. Students and parents are encouraged to come and support.',
    photos: [img.basketball, img.athleticsTrack],
    category: 'sports',
    daysAgo: 19
  },
  {
    id: 'mock-news-pohela-boishakh',
    title: 'In pictures: Pohela Boishakh brings colour to every campus',
    description:
      'From alpona painted across the courtyard to a Mangal Shobhajatra led by our youngest learners, the Bengali New Year was celebrated on all IHSB campuses. Students performed Rabindra Sangeet, staged a short folk play and ran stalls serving panta-ilish, pitha and fuchka.\n\nThe Art Club\'s hand-painted masks are on display in the library foyer until the end of term.',
    photos: [img.art, img.music, picsum('ihsb-boishakh-1'), picsum('ihsb-boishakh-2')],
    category: 'general',
    daysAgo: -annualOffset(4, 14, -168)
  },
  {
    id: 'mock-news-scholarships',
    title: 'Merit scholarships awarded to 36 students for the new academic year',
    description:
      'The Scholarship Committee has announced 36 merit and need-based awards for the coming academic year, covering between 25% and 100% of tuition. Recipients were selected on academic record, an interview and their contribution to school life.\n\nApplications for the next round open in March. Families can find the criteria on the Scholarship page or speak to the Admissions Office.',
    photos: [img.books, img.library],
    category: 'news',
    daysAgo: 104
  },
  {
    id: 'mock-news-robotics',
    title: 'Robotics Club qualifies for the World Robot Olympiad national round',
    description:
      'Two IHSB teams have qualified for the national round of the World Robot Olympiad after the Dhaka regional heats. The junior team\'s line-following robot completed the course eleven seconds faster than any other entry.\n\nThe club, which started with six members three years ago, now has more than fifty students from Grades 5 to 11.',
    photos: [img.robotics, img.technology, img.teamwork],
    category: 'news',
    daysAgo: 66
  },
  {
    id: 'mock-news-sports-day',
    title: 'Blue House crowned champions at the Annual Sports Day',
    description:
      'More than 900 students took part in the Annual Sports Day, with Blue House edging Green House by just fourteen points. Three school records fell, including the senior boys\' 400 metres, which had stood for nine years.\n\nThe day ended with the traditional teachers-versus-parents tug of war, won this year by the parents.',
    photos: [img.athleticsTrack, img.sunsetRun, img.sportsField],
    category: 'sports',
    daysAgo: 132
  },
  {
    id: 'mock-news-community-service',
    title: 'Students deliver winter clothing to 400 families in Kurigram',
    description:
      'Members of the Community Service Club travelled to Kurigram to distribute blankets and winter clothing collected through a month-long drive across all campuses. The drive raised enough to support 400 families, double last year\'s total.\n\n"We learned more in two days than in a term of geography lessons," said Grade 10 volunteer Imran Hossain.',
    photos: [img.studentsFriends, img.teamwork],
    category: 'general',
    daysAgo: 157
  }
]

export const mockNews: NewsDocument[] = seeds.map(({ daysAgo, ...item }, index) => {
  const date = daysFromNow(-daysAgo, 5, index * 7)
  return {
    ...item,
    date,
    createdAt: ts(date),
    updatedAt: ts(date)
  }
})
