/**
 * Image URLs for mock content. Only hosts already allowed in next.config.mjs:
 * images.unsplash.com and picsum.photos (fixed seeds, so they never change).
 */
const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`

export const picsum = (seed: string, width = 1600, height = 900) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`

export const img = {
  // Campus & classrooms
  campusBuilding: unsplash('1562774053-701939374585'),
  campusQuad: unsplash('1541339907198-e08756dedf3f'),
  campusHall: unsplash('1498243691581-b145c3f54a5a'),
  lectureHall: unsplash('1524178232363-1fb2b075b655'),
  classroomKids: unsplash('1503676260728-1c00da094a0b'),
  classroomTeacher: unsplash('1509062522246-3755977927d7'),
  classroomEmpty: unsplash('1580582932707-520aed937b7b'),
  primaryClass: unsplash('1577896851231-70ef18881754'),
  primaryStudents: unsplash('1588072432836-e10032774350'),
  studentsWriting: unsplash('1571260899304-425eee4c7efc'),
  studentsOutdoor: unsplash('1427504494785-3a9ca7044f45'),
  studentsGroup: unsplash('1522202176988-66273c2fd55f'),
  studentsFriends: unsplash('1529156069898-49953e39b3ac'),
  studentsLaptop: unsplash('1517486808906-6ca8b3f04846'),
  studyGroup: unsplash('1543269865-cbf427effbad'),
  teamwork: unsplash('1517245386807-bb43f82c33c4'),

  // Academics
  library: unsplash('1481627834876-b7833e8f5570'),
  books: unsplash('1456513080510-7bf3a84b82f8'),
  studying: unsplash('1513258496099-48168024aec0'),
  examDesk: unsplash('1434030216411-0b793f4b4173'),
  notebook: unsplash('1488190211105-8b0e65b80b4e'),
  onlineLearning: unsplash('1516321318423-f06f85e504b3'),
  scienceLab: unsplash('1532094349884-543bc11b234d'),
  robotics: unsplash('1485827404703-89b55fcc595e'),
  technology: unsplash('1519389950473-47ba0277781c'),
  graduation: unsplash('1606761568499-6d2451b23c66'),
  globe: unsplash('1521295121783-8a321d551ad2'),

  // Events, culture & stage
  conference: unsplash('1540575467063-178a50c2df87'),
  speaker: unsplash('1475721027785-f74eccf877e2'),
  eventHall: unsplash('1511578314322-379afb476865'),
  workshop: unsplash('1551836022-d5d88e9218df'),
  meeting: unsplash('1560439514-4e9645039924'),
  art: unsplash('1513364776144-60967b0f800f'),
  music: unsplash('1511379938547-c1f69419868d'),

  // Sports
  football: unsplash('1574629810360-7efbbe195018'),
  footballBall: unsplash('1579952363873-27f3bade9f55'),
  basketball: unsplash('1546519638-68e109498ffc'),
  cricket: unsplash('1531415074968-036ba1b575da'),
  badminton: unsplash('1626224583764-f87db24ac4ea'),
  chess: unsplash('1529699211952-734e80c4d42b'),
  athleticsTrack: unsplash('1461896836934-ffe607ba8211'),
  cycling: unsplash('1517649763962-0c623066013b'),
  stadium: unsplash('1551958219-acbc608c6377'),
  sportsField: unsplash('1508780709619-79562169bc64'),
  sunsetRun: unsplash('1502877338535-766e1452684a')
} as const

/** Portraits (square crops) */
const portrait = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=75`

export const portraits = {
  man1: portrait('1507003211169-0a1dd7228f2d'),
  man2: portrait('1500648767791-00dcc994a43e'),
  man3: portrait('1472099645785-5658abf4ff4e'),
  man4: portrait('1560250097-0b93528c311a'),
  man5: portrait('1519085360753-af0119f7cbe7'),
  woman1: portrait('1494790108377-be9c29b29330'),
  woman2: portrait('1438761681033-6461ffad8d80'),
  woman3: portrait('1544005313-94ddf0286df2'),
  woman4: portrait('1573496359142-b8d87734a5a2'),
  woman5: portrait('1580489944761-15a19d654956'),
  woman6: portrait('1573497019940-1c28c88b4f3e'),
  woman7: portrait('1567427017947-545c5f8d16ad')
} as const
