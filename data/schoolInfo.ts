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
    uttaraPrePrimary: '+8801775966264, +8801706054122',
    uttaraAdmission: '+8801706054122',
    uttaraSenior: '+8801763809476, +8801706044717',
    gulshan: '+8801791715556',
    chattogram: '+8801772511783, +8801772511784, +8802333337036'
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
  motto: 'Inspiring Future Leaders with Excellence and Compassion',
  branches: {
    uttaraPreschoolPrimary: {
      name: 'Uttara Preschool & Primary Section',
      address: 'Gate: 2, Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230',
      phone: ['+8801775966264', '+8801706054122'],
      email: 'info@ihsb.edu.bd'
    },
    uttaraSenior: {
      name: 'Uttara Senior Section',
      address: 'Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230',
      phone: ['+8801763809476', '+8801706044717'],
      email: 'info@ihsb.edu.bd'
    },
    gulshanPreschool: {
      name: 'Gulshan Preschool',
      address: 'House: 4 B, Road: 118, Gulshan 2',
      phone: ['+8801791715556'],
      email: 'info@ihsb.edu.bd'
    },
    gulshanPrimaryMiddle: {
      name: 'Gulshan Primary & Middle Section',
      address: 'House: 9, Road: 111, Gulshan-2, Dhaka-1212',
      phone: ['+8802222284242', '+8801760634644'],
      email: 'info@ihsb.edu.bd'
    },
    chattogram: {
      name: 'Chattogram Branch',
      address: 'Road 5, House 7, Nasirabad Housing Society',
      phone: ['+8801772511783', '+8801772511784', '+8802333337036'],
      email: 'info@ihsb.edu.bd'
    }
  }
}

export type SchoolInfo = typeof schoolInfo

