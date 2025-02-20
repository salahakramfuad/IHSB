// components/Curriculum.js
'use client'
import React, { useState } from 'react'

const Curriculum = () => {
  // Possible sections: preschool, primary, senior, advanced
  const [activeSection, setActiveSection] = useState('preschool')

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <header className='mb-12 text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-green-900 mb-4'>
            Curriculum of International Hope School
          </h1>
          <p className='text-xl text-gray-700'>
            A comprehensive, holistic approach to education for every stage.
          </p>
        </header>

        {/* Navigation Buttons */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {[
            { key: 'preschool', label: 'Preschool Curriculum' },
            { key: 'primary', label: 'Primary School Curriculum' },
            { key: 'senior', label: 'Senior Section Curriculum' },
            { key: 'advanced', label: 'Advanced Level Curriculum' }
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`relative z-10 px-3 py-2 text-sm md:text-base rounded-md font-semibold transition-colors duration-300 ${
                activeSection === section.key
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-green-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'preschool' && (
          <section className='mb-20'>
            <div className='bg-white rounded-xl shadow-2xl p-8'>
              <h2 className='text-3xl font-bold text-blue-900 mb-6'>
                IHSB PRESCHOOL CURRICULUM
              </h2>
              <p className='text-gray-600 mb-8'>
                Preschool curriculum is planned carefully for the holistic
                development of the children. At the focal point of the
                curriculum framework is the child & the belief that children are
                curious, dynamic, and competent learners.
              </p>
              <h3 className='text-2xl font-semibold text-gray-800 mb-6'>
                Six Key Areas:
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[
                  {
                    title: 'Language and Literacy (English & Bangla)',
                    icon: '📚',
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
                    details: [
                      'Enjoy participation in a variety of physical activities.',
                      'Demonstrate control, coordination, and balance in gross motor skills.',
                      'Develop healthy habits and safety awareness at home, in school, and in public places.'
                    ]
                  },
                  {
                    title: 'Aesthetics and Creative Expression',
                    icon: '🎨',
                    details: [
                      'Enjoy art, music, and movement activities.',
                      'Express ideas and feelings through art, music, and movement.',
                      'Create art and music using experimentation and imagination.'
                    ]
                  },
                  {
                    title: 'Social and Emotional Development',
                    icon: '❤️',
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
                ].map((section, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'
                  >
                    <div className='text-4xl mb-4'>{section.icon}</div>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      {section.title}
                    </h3>
                    <ul className='list-disc list-inside text-gray-600 space-y-2'>
                      {section.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className='text-gray-600 italic mt-8'>
                IHSB defines assessment as the process of setting clear and
                measurable learning outcomes and objectives, implementing
                balanced assessment tools, which in turn provides specific
                feedback to the parties involved in student learning and
                identifies appropriate targets for the education process.
              </p>
            </div>
          </section>
        )}

        {activeSection === 'primary' && (
          <section className='mb-20'>
            <div className='bg-white rounded-xl shadow-2xl p-8'>
              <h2 className='text-3xl font-bold text-blue-900 mb-6'>
                IHSB PRIMARY SCHOOL CURRICULUM
              </h2>
              <p className='text-gray-600 mb-8'>
                Our curriculum is designed to ensure the holistic development of
                students through a measurable plan and structure followed by our
                educators to deliver the highest standard of education. The
                internationally recognized Cambridge Primary Curriculum and
                Assessment—including Cambridge Primary Checkpoint and yearly
                progression tests from Year 2 to 5—enhances students’
                confidence, intellectual skills, and social competencies.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[
                  {
                    title: 'English Language and Literature',
                    icon: '📖',
                    details: [
                      'Develop English skills for different purposes and audiences.',
                      'Enquire-based approach to build confidence, creativity, and intellectual engagement.',
                      'Covers reading, writing, speaking, and listening skills.'
                    ]
                  },
                  {
                    title: 'Mathematics',
                    icon: '🧮',
                    details: [
                      'Explore numbers, geometry, measure, data handling, and problem solving.',
                      'Emphasize principles, patterns, systems, functions, and relationships.'
                    ]
                  },
                  {
                    title: 'Science',
                    icon: '🔬',
                    details: [
                      'Stimulate curiosity by encouraging investigation of problems.',
                      'Covers scientific enquiry, biology, chemistry, and physics.',
                      'Includes environmental awareness and history of science.'
                    ]
                  },
                  {
                    title: 'Bangla',
                    icon: '🇧🇩',
                    details: [
                      'Strong emphasis on developing Bangla language skills.',
                      'Follows the curriculum engineered by the National Curriculum and Textbook Board.'
                    ]
                  },
                  {
                    title: 'Computer',
                    icon: '💻',
                    details: [
                      'Develop ICT competence through Cambridge ICT Starters.',
                      'Includes applications like programming, word processing, digital graphics, databases, and more.'
                    ]
                  },
                  {
                    title: 'Character and Value Education',
                    icon: '🌟',
                    details: [
                      'Instill vital universal values such as honesty, empathy, responsibility, respect, sharing, caring, trustworthiness, fairness, and citizenship.'
                    ]
                  }
                ].map((section, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'
                  >
                    <div className='text-4xl mb-4'>{section.icon}</div>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                      {section.title}
                    </h3>
                    <ul className='list-disc list-inside text-gray-600 space-y-2'>
                      {section.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className='text-gray-600 mt-8'>
                Assessment in Primary School involves both formative (Assessment
                for Learning) and summative (Assessment of Learning) processes.
                Evaluation criteria include class tests, performance, homework,
                and project work. An educational portfolio is updated quarterly
                to reflect each child’s progress.
              </p>
            </div>
          </section>
        )}

        {activeSection === 'senior' && (
          <section className='mb-20'>
            <div className='bg-white rounded-xl shadow-2xl p-8'>
              <h2 className='text-3xl font-bold text-blue-900 mb-6'>
                IHSB SENIOR SECTION CURRICULUM
              </h2>
              <p className='text-gray-600 mb-8'>
                We offer a Cambridge curriculum with excellent facilitation for
                both IGCSE and O Level specifications.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4'>
                    Cambridge IGCSE Curriculum
                  </h3>
                  <ul className='list-disc list-inside text-gray-600 space-y-2'>
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
                </div>
                <div className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4'>
                    Advanced Level Curriculum
                  </h3>
                  <ul className='list-disc list-inside text-gray-600 space-y-2'>
                    <li>
                      Subjects include Mathematics, Further Mathematics,
                      Chemistry, Physics, Biology, Accounting, Business Studies,
                      and Economics.
                    </li>
                    <li>
                      Students can choose between science and business streams.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='mt-8'>
                <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                  Recognition and Progression
                </h3>
                <p className='text-gray-600 mb-4'>
                  The combination of Cambridge IGCSE qualifications with
                  subsequent AS & A Level achievements gives learners a solid
                  foundation for further study. Candidates achieving grades A*
                  to C are well prepared for a wide range of courses including
                  Cambridge International AS & A Level. These qualifications are
                  recognized by leading universities worldwide.
                </p>
                <p className='text-gray-600 italic'>
                  Note: All candidates for science subjects are required to take
                  three papers.
                </p>
                <p className='text-gray-600 mt-4'>
                  Achievement: For over a decade, IHSB students have
                  consistently shown outstanding achievement, thanks to
                  enthusiastic teachers, clear guidelines, and a friendly school
                  environment.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'advanced' && (
          <section className='mb-20'>
            <div className='bg-white rounded-xl shadow-2xl p-8'>
              <h2 className='text-3xl font-bold text-blue-900 mb-6'>
                ADVANCED LEVEL CURRICULUM IN IHSB
              </h2>
              <p className='text-gray-600 mb-8'>
                In International Hope School Bangladesh, we offer a wide variety
                of programs that immerse students in authentic language
                environments both in the classroom and through field trips. Our
                communicative approach enhances confidence and proficiency in
                speaking, listening, reading, and writing.
              </p>
              <p className='text-gray-600 mb-8'>
                Although we currently follow Cambridge IGCSE & O Level
                curricula, we plan to introduce Cambridge AS Qualifications in
                the upcoming Academic Year, followed by Cambridge AS & A Levels
                thereafter.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Subjects Offered in Pearson-Edexcel A Levels
                  </h3>
                  <ul className='list-disc list-inside text-gray-600 space-y-2'>
                    <li>Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)</li>
                    <li>Further Mathematics</li>
                    <li>Chemistry</li>
                    <li>Physics</li>
                    <li>Biology</li>
                    <li>Accounting</li>
                    <li>Business Studies</li>
                    <li>Economics</li>
                  </ul>
                </div>
                <div className='bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Why Choose Our A Level Programme?
                  </h3>
                  <ul className='list-disc list-inside text-gray-600 space-y-2'>
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
                </div>
              </div>
              <div className='mt-8'>
                <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                  A Level Structure
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-2'>
                  <li>
                    <strong>IAS (Advanced Subsidiary or AS Level):</strong> The
                    first half of the programme forming the foundation.
                  </li>
                  <li>
                    <strong>IAL (A2 Level):</strong> The second part covering
                    more complex topics.
                  </li>
                </ul>
                <p className='text-gray-600 mt-4'>
                  The Cambridge International A Level is reported on a scale
                  from A* (highest) to E (minimum required). Note that AS Levels
                  are reported from A to E.
                </p>
              </div>
              <div className='mt-8'>
                <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                  Cambridge International AS & A Level Develops:
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-2'>
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
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Curriculum
