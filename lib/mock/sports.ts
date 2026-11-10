import type { SportsAchievementDocument } from '@/lib/database/sports'
import { daysFromNow, ts } from './helpers'
import { img, picsum } from './images'

type Seed = Omit<SportsAchievementDocument, 'date' | 'createdAt' | 'updatedAt' | 'id'> & { daysAgo: number }

const seeds: Seed[] = [
  {
    slug: 'dhaka-international-schools-cup',
    title: 'Dhaka International Schools Cup',
    sport: 'Football',
    placement: 'Champion',
    description: 'Senior boys beat the hosts 2-1 in the final to win the cup for the third time in five seasons.',
    longDescription:
      'IHSB went through the tournament unbeaten, scoring fourteen goals and conceding three. In the final, captain Rafsan Karim curled in a free kick from twenty-five yards before Yusuf Demir headed the winner twelve minutes from time. Goalkeeper Tanvir Alam was named Player of the Tournament after saving two penalties in the semi-final shoot-out.',
    daysAgo: 12,
    image: img.football,
    location: 'Uttara, Dhaka',
    photos: [img.football, img.footballBall, img.stadium, picsum('ihsb-cup-1'), picsum('ihsb-cup-2')]
  },
  {
    slug: 'inter-school-basketball-league-girls',
    title: 'Inter-School Basketball League (Girls)',
    sport: 'Basketball',
    placement: 'Champion',
    description: 'The girls\' team completed an unbeaten league season, winning the deciding game 48-41.',
    longDescription:
      'Ten wins from ten games gave IHSB the league title with a round to spare. Point guard Samira Haque led the league in assists, and centre Elif Kaya averaged a double-double across the season.',
    daysAgo: 34,
    image: img.basketball,
    location: 'Bashundhara, Dhaka',
    photos: [img.basketball, picsum('ihsb-bball-1'), picsum('ihsb-bball-2')]
  },
  {
    slug: 'gulshan-schools-t20',
    title: 'Gulshan Schools T20 Cricket',
    sport: 'Events',
    placement: 'Runner-up',
    description: 'The Under-16 cricketers reached the final unbeaten, finishing eleven runs short of the title.',
    longDescription:
      'Opening batter Shadman Rahim scored 214 runs across the tournament and was named Player of the Tournament. Left-arm spinner Ishaan Roy took nine wickets, including 4 for 17 in the semi-final.',
    daysAgo: 51,
    image: img.cricket,
    location: 'Gulshan, Dhaka',
    photos: [img.cricket, img.sportsField, picsum('ihsb-t20-1')]
  },
  {
    slug: 'national-school-chess-championship',
    title: 'National School Chess Championship',
    sport: 'Chess',
    placement: 'Champion',
    description: 'Grade 8 student Raiyan Chowdhury won the Under-14 title with 6.5 points from 7 rounds.',
    longDescription:
      'Raiyan drew only his fourth-round game on the way to the Under-14 title. The IHSB team also finished third in the overall school standings out of 46 schools.',
    daysAgo: 68,
    image: img.chess,
    location: 'Bangladesh Chess Federation, Dhaka',
    photos: [img.chess, picsum('ihsb-chess-1')]
  },
  {
    slug: 'dhaka-junior-badminton-open',
    title: 'Dhaka Junior Badminton Open',
    sport: 'Badminton',
    placement: 'Champion',
    description: 'Nusrat Jahan and Aylin Yildiz won the girls\' doubles title without dropping a game.',
    longDescription:
      'The Grade 10 pair won four matches in straight games. Nusrat also reached the singles semi-final, and the boys\' doubles pair of Fahim and Mehmet finished in the last eight.',
    daysAgo: 83,
    image: img.badminton,
    location: 'Mirpur Indoor Stadium, Dhaka',
    photos: [img.badminton, picsum('ihsb-badminton-1')]
  },
  {
    slug: 'aga-khan-inter-school-football',
    title: 'Aga Khan Inter-School Football Tournament',
    sport: 'Football',
    placement: 'Runner-up',
    description: 'The Under-14 side reached the final, losing narrowly on penalties after a goalless draw.',
    longDescription:
      'A young IHSB squad kept four clean sheets in five games. Midfielder Adnan Sarker received the Fair Play Award from the organisers.',
    daysAgo: 97,
    image: img.footballBall,
    location: 'Uttara, Dhaka',
    photos: [img.footballBall, img.football, picsum('ihsb-akfc-1')]
  },
  {
    slug: 'inter-school-athletics-meet',
    title: 'Inter-School Athletics Meet',
    sport: 'Events',
    placement: 'Award',
    description: 'IHSB athletes won nine medals, including gold in the senior 4x100m relay and the girls\' long jump.',
    longDescription:
      'Four gold, three silver and two bronze medals placed IHSB second in the overall medal table among 28 schools. Sprinter Mahir Faisal set a new meet record of 11.02 seconds in the 100 metres.',
    daysAgo: 112,
    image: img.athleticsTrack,
    location: 'Bangladesh Army Stadium, Dhaka',
    photos: [img.athleticsTrack, img.sunsetRun, picsum('ihsb-athletics-1')]
  },
  {
    slug: 'dps-basketball-tournament-boys',
    title: 'DPS Inter-School Basketball Tournament (Boys)',
    sport: 'Basketball',
    placement: 'Runner-up',
    description: 'The boys\' team came back from fourteen points down in the semi-final before losing a close final.',
    longDescription:
      'Shooting guard Kerem Arslan scored 27 points in the semi-final comeback. The final was decided in the last minute, 52-55.',
    daysAgo: 128,
    image: img.basketball,
    location: 'Uttara, Dhaka',
    photos: [img.basketball, picsum('ihsb-dps-1')]
  },
  {
    slug: 'rapid-chess-open-team',
    title: 'Dhaka Schools Rapid Chess Open (Team)',
    sport: 'Chess',
    placement: 'Runner-up',
    description: 'The four-board team finished second out of 32 schools, half a point behind the winners.',
    daysAgo: 141,
    image: img.chess,
    location: 'Dhanmondi, Dhaka',
    photos: [img.chess]
  },
  {
    slug: 'inter-campus-badminton-championship',
    title: 'Inter-Campus Badminton Championship',
    sport: 'Badminton',
    placement: 'Participant',
    description: 'Over sixty students from the Uttara, Gulshan and Chattogram campuses took part in singles and doubles.',
    daysAgo: 155,
    image: img.badminton,
    location: 'Indoor Sports Hall, Uttara',
    photos: [img.badminton, picsum('ihsb-campus-badminton')]
  },
  {
    slug: 'swimming-gala-inter-school',
    title: 'Inter-School Swimming Gala',
    sport: 'Events',
    placement: 'Champion',
    description: 'The swim squad won the overall team trophy with seven individual golds and both medley relays.',
    daysAgo: 170,
    image: img.cycling,
    location: 'Gulshan, Dhaka',
    photos: [picsum('ihsb-swim-1'), picsum('ihsb-swim-2')]
  }
]

export const mockSports: SportsAchievementDocument[] = seeds.map(({ daysAgo, ...item }) => {
  const date = daysFromNow(-daysAgo, 9)
  return {
    id: `mock-sport-${item.slug}`,
    ...item,
    date,
    createdAt: ts(date),
    updatedAt: ts(date)
  }
})
