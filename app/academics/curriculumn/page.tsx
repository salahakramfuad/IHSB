'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

const curriculumSections = [
  {
    key: 'preschool',
    label: 'Preschool Curriculum',
    color: 'from-accent-pink-500 to-accent-pink-600',
    bgColor: 'bg-accent-pink-50',
    icon: '🎨'
  },
  {
    key: 'primary',
    label: 'Primary School Curriculum',
    color: 'from-accent-blue-500 to-accent-blue-600',
    bgColor: 'bg-accent-blue-50',
    icon: '📚'
  },
  {
    key: 'senior',
    label: 'Senior Section Curriculum',
    color: 'from-primary-green-500 to-primary-green-600',
    bgColor: 'bg-primary-green-50',
    icon: '🎓'
  },
  {
    key: 'advanced',
    label: 'Advanced Level Curriculum',
    color: 'from-accent-purple-500 to-accent-purple-600',
    bgColor: 'bg-accent-purple-50',
    icon: '⭐'
  }
]

const preschoolAreas = [
  {
    title: 'Language and Literacy (English & Bangla)',
    icon: '📚',
    color: 'from-accent-blue-400 to-accent-blue-600',
    details: [
      'Associate the sound to the letter using phonetics.',
      'Develop the four language skills: reading, writing, listening, speaking.',
      'Demonstrate ability to think critically.',
      'Read numerous stories to expose children to a variety of genres, time periods, styles, and authors.',
      'Apply the rules of language to enhance communication skills.',
      'Develop vocabulary through direct instruction, reading, and listening to texts read aloud.',
      'Listen and read aloud with accuracy, comprehend small stories, and automatically read irregular high-frequency words.',
      'Use prior knowledge to monitor comprehension, organize pictures, answer and generate questions, recognize story structure, retell stories, make connections, solve problems, create conclusions, and maintain sequences.'
    ]
  },
  {
    title: 'Numeracy',
    icon: '🧮',
    color: 'from-primary-green-400 to-primary-green-600',
    details: [
      'Use numbers in daily experiences.',
      'Recognize and use simple relationships and patterns.',
      'Recognize and use shapes and simple spatial concepts in daily experiences.',
      'Solve two-digit addition and subtraction problems.'
    ]
  },
  {
    title: 'Motor Skill Development',
    icon: '🏃‍♂️',
    color: 'from-accent-orange-400 to-accent-orange-600',
    details: [
      'Enjoy participation in a variety of physical activities.',
      'Demonstrate control, coordination, and balance in gross motor skills.',
      'Develop healthy habits and safety awareness at home, in school, and in public places.'
    ]
  },
  {
    title: 'Aesthetics and Creative Expression',
    icon: '🎨',
    color: 'from-accent-pink-400 to-accent-pink-600',
    details: [
      'Enjoy art, music, and movement activities.',
      'Express ideas and feelings through art, music, and movement.',
      'Create art and music using experimentation and imagination.'
    ]
  },
  {
    title: 'Social and Emotional Development',
    icon: '❤️',
    color: 'from-accent-purple-400 to-accent-purple-600',
    details: [
      'Develop an awareness of personal identity.',
      'Manage their own emotions and behaviors.',
      'Show respect for diversity.',
      'Communicate, interact, and build relationships with others.'
    ]
  },
  {
    title: 'Discovery of the World Around Us',
    icon: '🌍',
    color: 'from-accent-teal-400 to-accent-teal-600',
    details: [
      'Name, label, spell, and match major body parts.',
      'Discover their five senses through real-life examples and recognize different organs (eye, ear, tongue, skin, nose).',
      'Identify general parts of a tree (leaf, branch, root, trunk, bark, fruit) by practical observation.',
      'Name different flowers (sunflower, water lily, rose, marigold, pansy, tulip) with details on spelling, color, patterns, and growing place.',
      'Identify different animals and their babies.',
      'Identify different birds by name, food, category, color, living places, and major body parts.',
      'Identify different food habits of humans and animals.',
      'Explore the difference between day and night and the reasons behind it.',
      'Identify the four seasons and their names.',
      'Sort out different types of materials.',
      'Describe the seed growing process and germination.'
    ]
  }
]

const primarySubjects = [
  {
    title: 'English Language and Literature',
    icon: '📖',
    color: 'from-accent-blue-400 to-accent-blue-600',
    details: [
      'Develop English skills for different purposes and audiences.',
      'Enquire-based approach to build confidence, creativity, and intellectual engagement.',
      'Covers reading, writing, speaking, and listening skills.'
    ]
  },
  {
    title: 'Mathematics',
    icon: '🧮',
    color: 'from-primary-green-400 to-primary-green-600',
    details: [
      'Explore numbers, geometry, measure, data handling, and problem solving.',
      'Emphasize principles, patterns, systems, functions, and relationships.'
    ]
  },
  {
    title: 'Science',
    icon: '🔬',
    color: 'from-accent-purple-400 to-accent-purple-600',
    details: [
      'Stimulate curiosity by encouraging investigation of problems.',
      'Covers scientific enquiry, biology, chemistry, and physics.',
      'Includes environmental awareness and history of science.'
    ]
  },
  {
    title: 'Bangla',
    icon: '🇧🇩',
    color: 'from-accent-teal-400 to-accent-teal-600',
    details: [
      'Strong emphasis on developing Bangla language skills.',
      'Follows the curriculum engineered by the National Curriculum and Textbook Board.'
    ]
  },
  {
    title: 'Computer',
    icon: '💻',
    color: 'from-accent-orange-400 to-accent-orange-600',
    details: [
      'Develop ICT competence through Cambridge ICT Starters.',
      'Includes applications like programming, word processing, digital graphics, databases, and more.'
    ]
  },
  {
    title: 'Character and Value Education',
    icon: '🌟',
    color: 'from-accent-yellow-400 to-accent-yellow-600',
    details: [
      'Instill vital universal values such as honesty, empathy, responsibility, respect, sharing, caring, trustworthiness, fairness, and citizenship.'
    ]
  }
]

export default function CurriculumPage() {
  const [activeSection, setActiveSection] = useState('preschool')

  const activeSectionData = curriculumSections.find((s) => s.key === activeSection)

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Curriculum'
          subtitle='A comprehensive, holistic approach to education for every stage of learning'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Curriculum' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Navigation Buttons */}
          <div className='flex flex-wrap justify-center gap-4 mb-12'>
            {curriculumSections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeSection === section.key
                    ? `bg-gradient-to-r ${section.color} text-white scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <span className='text-2xl mr-2'>{section.icon}</span>
                <span className='text-sm sm:text-base'>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Preschool Section */}
          {activeSection === 'preschool' && (
            <div className='space-y-8'>
              <Card className={`border-2 border-accent-pink-200 ${curriculumSections[0].bgColor}`}>
                <div className={`h-2 bg-gradient-to-r ${curriculumSections[0].color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  IHSB Preschool Curriculum 🎨
                </h2>
                <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
                  Preschool curriculum is planned carefully for the holistic
                  development of the children. At the focal point of the
                  curriculum framework is the child & the belief that children are
                  curious, dynamic, and competent learners.
                </p>
                <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                  Six Key Areas:
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {preschoolAreas.map((area, index) => (
                    <Card
                      key={index}
                      className={`hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-gray-200`}
                    >
                      <div className={`h-1 bg-gradient-to-r ${area.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                      <div className='text-5xl mb-4'>{area.icon}</div>
                      <h4 className='text-lg font-bold text-gray-900 mb-3'>
                        {area.title}
                      </h4>
                      <ul className='list-disc list-inside text-gray-600 space-y-2 text-sm'>
                        {area.details.map((detail, i) => (
                          <li key={i} className='leading-relaxed'>{detail}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                <div className='mt-8 p-6 bg-white/80 rounded-xl border-2 border-primary-green-200'>
                  <p className='text-gray-700 italic leading-relaxed'>
                    <strong className='text-primary-green-700'>Assessment:</strong> IHSB defines assessment as the process of setting clear and
                    measurable learning outcomes and objectives, implementing
                    balanced assessment tools, which in turn provides specific
                    feedback to the parties involved in student learning and
                    identifies appropriate targets for the education process.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Primary Section */}
          {activeSection === 'primary' && (
            <div className='space-y-8'>
              <Card className={`border-2 border-accent-blue-200 ${curriculumSections[1].bgColor}`}>
                <div className={`h-2 bg-gradient-to-r ${curriculumSections[1].color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  IHSB Primary School Curriculum 📚
                </h2>
                <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
                  Our curriculum is designed to ensure the holistic development of
                  students through a measurable plan and structure followed by our
                  educators to deliver the highest standard of education. The
                  internationally recognized Cambridge Primary Curriculum and
                  Assessment—including Cambridge Primary Checkpoint and yearly
                  progression tests from Year 2 to 5—enhances students'
                  confidence, intellectual skills, and social competencies.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {primarySubjects.map((subject, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-gray-200'
                    >
                      <div className={`h-1 bg-gradient-to-r ${subject.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                      <div className='text-5xl mb-4'>{subject.icon}</div>
                      <h4 className='text-lg font-bold text-gray-900 mb-3'>
                        {subject.title}
                      </h4>
                      <ul className='list-disc list-inside text-gray-600 space-y-2 text-sm'>
                        {subject.details.map((detail, i) => (
                          <li key={i} className='leading-relaxed'>{detail}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                <div className='mt-8 p-6 bg-white/80 rounded-xl border-2 border-primary-green-200'>
                  <p className='text-gray-700 leading-relaxed'>
                    <strong className='text-primary-green-700'>Assessment in Primary School</strong> involves both formative (Assessment
                    for Learning) and summative (Assessment of Learning) processes.
                    Evaluation criteria include class tests, performance, homework,
                    and project work. An educational portfolio is updated quarterly
                    to reflect each child's progress.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Senior Section */}
          {activeSection === 'senior' && (
            <div className='space-y-8'>
              <Card className={`border-2 border-primary-green-200 ${curriculumSections[2].bgColor}`}>
                <div className={`h-2 bg-gradient-to-r ${curriculumSections[2].color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  IHSB Senior Section Curriculum 🎓
                </h2>
                <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
                  We offer a Cambridge curriculum with excellent facilitation for
                  both IGCSE and O Level specifications.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                  <Card className='bg-gradient-to-br from-accent-blue-50 to-accent-blue-100 border-2 border-accent-blue-200'>
                    <div className='h-1 bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
                    <h3 className='text-xl font-bold text-accent-blue-900 mb-4'>
                      Cambridge IGCSE Curriculum
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>
                        Subjects include Accounting (0452), Biology (0610),
                        Business Studies (0450), Chemistry (0620), Information and
                        Communication Technology (0417), Economics (0455), English
                        as First Language (0500), English as a Second Language
                        (0510), Mathematics (0580), Additional Mathematics (0606),
                        Physics (0625), World Literature (0408), and Computer
                        Science (0478).
                      </li>
                      <li>
                        Each student is required to take a minimum of six
                        subjects; up to eleven subjects may be taken with extra
                        classes provided for timetable clashes.
                      </li>
                    </ul>
                  </Card>
                  <Card className='bg-gradient-to-br from-primary-green-50 to-primary-green-100 border-2 border-primary-green-200'>
                    <div className='h-1 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
                    <h3 className='text-xl font-bold text-primary-green-900 mb-4'>
                      Advanced Level Curriculum
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>
                        Subjects include Mathematics, Further Mathematics,
                        Chemistry, Physics, Biology, Accounting, Business Studies,
                        and Economics.
                      </li>
                      <li>
                        Students can choose between science and business streams.
                      </li>
                    </ul>
                  </Card>
                </div>
                <div className='p-6 bg-white/80 rounded-xl border-2 border-primary-green-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>
                    Recognition and Progression
                  </h3>
                  <p className='text-gray-700 mb-4 leading-relaxed'>
                    The combination of Cambridge IGCSE qualifications with
                    subsequent AS & A Level achievements gives learners a solid
                    foundation for further study. Candidates achieving grades A*
                    to C are well prepared for a wide range of courses including
                    Cambridge International AS & A Level. These qualifications are
                    recognized by leading universities worldwide.
                  </p>
                  <p className='text-gray-700 italic mb-4'>
                    Note: All candidates for science subjects are required to take
                    three papers.
                  </p>
                  <p className='text-gray-700 leading-relaxed'>
                    <strong>Achievement:</strong> For over a decade, IHSB students have
                    consistently shown outstanding achievement, thanks to
                    enthusiastic teachers, clear guidelines, and a friendly school
                    environment.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Advanced Section */}
          {activeSection === 'advanced' && (
            <div className='space-y-8'>
              <Card className={`border-2 border-accent-purple-200 ${curriculumSections[3].bgColor}`}>
                <div className={`h-2 bg-gradient-to-r ${curriculumSections[3].color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  Advanced Level Curriculum in IHSB ⭐
                </h2>
                <p className='text-lg text-gray-700 mb-4 leading-relaxed'>
                  In International Hope School Bangladesh, we offer a wide variety
                  of programs that immerse students in authentic language
                  environments both in the classroom and through field trips. Our
                  communicative approach enhances confidence and proficiency in
                  speaking, listening, reading, and writing.
                </p>
                <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
                  Although we currently follow Cambridge IGCSE & O Level
                  curricula, we plan to introduce Cambridge AS Qualifications in
                  the upcoming Academic Year, followed by Cambridge AS & A Levels
                  thereafter.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                  <Card className='bg-gradient-to-br from-accent-purple-50 to-accent-purple-100 border-2 border-accent-purple-200'>
                    <div className='h-1 bg-gradient-to-r from-accent-purple-500 to-accent-purple-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
                    <h3 className='text-xl font-bold text-accent-purple-900 mb-4'>
                      Subjects Offered in Pearson-Edexcel A Levels
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)</li>
                      <li>Further Mathematics</li>
                      <li>Chemistry</li>
                      <li>Physics</li>
                      <li>Biology</li>
                      <li>Accounting</li>
                      <li>Business Studies</li>
                      <li>Economics</li>
                    </ul>
                  </Card>
                  <Card className='bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border-2 border-accent-yellow-200'>
                    <div className='h-1 bg-gradient-to-r from-accent-yellow-400 to-accent-orange-500 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Why Choose Our A Level Programme?
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>Expert advice for informed university choices.</li>
                      <li>
                        Opportunity to apply to universities worldwide (USA,
                        Australia, UK, Canada, Japan, Hong Kong, etc.).
                      </li>
                      <li>In-depth university application support.</li>
                      <li>
                        University fairs and structured enrichment activities.
                      </li>
                      <li>Small classes with an average of twenty students.</li>
                      <li>
                        Option to study Further Mathematics, uniquely offered by
                        IHSB.
                      </li>
                      <li>
                        Choice between science, business, or a mix with complete
                        subject control.
                      </li>
                      <li>
                        Continuous assessments via mock exams and model tests at
                        our British Council exam center.
                      </li>
                    </ul>
                  </Card>
                </div>
                <div className='space-y-6'>
                  <Card className='bg-white/80 border-2 border-primary-green-200'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      A Level Structure
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>
                        <strong>IAS (Advanced Subsidiary or AS Level):</strong> The
                        first half of the programme forming the foundation.
                      </li>
                      <li>
                        <strong>IAL (A2 Level):</strong> The second part covering
                        more complex topics.
                      </li>
                    </ul>
                    <p className='text-gray-700 mt-4 leading-relaxed'>
                      The Cambridge International A Level is reported on a scale
                      from A* (highest) to E (minimum required). Note that AS Levels
                      are reported from A to E.
                    </p>
                  </Card>
                  <Card className='bg-gradient-to-br from-primary-green-50 to-accent-teal-50 border-2 border-primary-green-200'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                      Cambridge International AS & A Level Develops:
                    </h3>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                      <li>In-depth subject content</li>
                      <li>Independent thinking</li>
                      <li>
                        Application of knowledge to new and familiar situations
                      </li>
                      <li>Handling and evaluating various information sources</li>
                      <li>Logical thinking and coherent argumentation</li>
                      <li>Judgment, recommendations, and decision-making skills</li>
                      <li>Effective communication in English</li>
                    </ul>
                  </Card>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
