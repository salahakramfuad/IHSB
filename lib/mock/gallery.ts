import { filler } from './filler.generated'
import { img, picsum } from './images'
import type { GalleryItem } from './types'

export const mockGallery: GalleryItem[] = [
  { src: img.campusBuilding, caption: 'The Uttara Senior Section at the start of the school day' },
  { src: img.scienceLab, caption: 'Grade 10 chemistry practical in the senior science wing' },
  { src: img.library, caption: 'The library holds more than 18,000 titles in English and Bangla' },
  { src: img.football, caption: 'Senior boys in the final of the Dhaka International Schools Cup' },
  { src: img.classroomTeacher, caption: 'A Grade 4 mathematics lesson at the Gulshan campus' },
  { src: img.art, caption: 'Alpona painting for Pohela Boishakh in the central courtyard' },
  { src: img.basketball, caption: 'League game in the indoor sports hall' },
  { src: img.conference, caption: 'Opening ceremony of the Model United Nations conference' },
  { src: img.robotics, caption: 'Robotics Club preparing for the World Robot Olympiad' },
  { src: img.graduation, caption: 'A Level graduates at the annual graduation ceremony' },
  { src: img.music, caption: 'The school choir rehearsing for the Victory Day programme' },
  { src: img.athleticsTrack, caption: 'Relay finals at the Annual Sports Day' },
  { src: img.primaryClass, caption: 'Story time in the Preschool & Primary Section' },
  { src: picsum(filler.imageSeeds[0]), caption: 'Morning assembly on the Uttara campus' },
  { src: picsum(filler.imageSeeds[1]), caption: 'Science Fair exhibits in the auditorium foyer' }
]
