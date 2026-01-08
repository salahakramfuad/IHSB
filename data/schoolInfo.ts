// data/schoolInfo.ts
// Centralized school information for easy updates

export const schoolInfo = {
  name: 'International Hope School Bangladesh',
  shortName: 'IHSB',
  address: {
    main: 'Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230',
    full: 'Plot:07, Road:06, Sector:04, House-25 Rd-06, Dhaka 1230'
  },
  phone: {
    main: '+880.2.48956999',
    alternate: '+880.2.48953722-3',
    uttaraPrePrimary: '+880.2.48956999, 017 7596 6264',
    uttaraAdmission: '017 0605 4122',
    uttaraSenior: '+8801329685901, +8801329685902',
    gulshan: '+8801791715556',
    chattogram: '+8801772511783'
  },
  fax: '+880.2.48954242',
  email: {
    general: 'info@ihsb.edu.bd',
    admission: 'admission@ihsb.edu.bd'
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/ihsbd.net',
    instagram: 'https://www.instagram.com/lifeatihsb',
    linkedin:
      'https://www.linkedin.com/company/international-hope-school-bangladesh',
    twitter: 'https://www.twitter.com'
  },
  website: 'https://ihsb.edu.bd',
  foundingYear: 1996,
  motto: 'Inspiring Future Leaders with Excellence and Compassion'
}

export type SchoolInfo = typeof schoolInfo

