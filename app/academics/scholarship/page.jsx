import React from 'react'

const ScholarshipProgram = () => {
  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-blue-900 mb-4'>
            Merit-Based Scholarship Program
          </h1>
          <p className='text-xl text-gray-700'>
            For Students of Other Schools | Age: 11-16
          </p>
        </header>

        {/* Scholarship Policy */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>🎓</span> Scholarship Program Policy
          </h2>
          <p className='text-gray-700'>
            International Hope School Bangladesh (IHSB) has much to offer pupils
            who have outstanding talent and potential academically. Accordingly,
            this scholarship is available to exceptional students who will
            enhance the reputation of the school, whilst benefiting from an
            extensive range of opportunities. IHSB strives to motivate and
            empower students to achieve their higher education goals by
            providing knowledge, skills, and financial resources essential for
            success. The target group of students is aged 11 to 16. This
            scholarship program is worth up to{' '}
            <span className='font-semibold'>90%</span> of the tuition fee.
          </p>
        </section>

        {/* Scholarship Assessment Criteria */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>📊</span> Scholarship Assessment Criteria
          </h2>
          <p className='text-gray-700 mb-6'>
            The assessment process for all scholarships will enable the school
            to evaluate how well candidates can perform in their comfort zone as
            well as in other areas, and whether they can demonstrate the
            potential to develop further. This will also explore potential by
            exposing candidates to new concepts or processes and offering
            challenging opportunities to show tenacity and leadership. Based on
            commitment and dependability at school, students’ activities will
            also be evaluated.
          </p>

          {/* Selection Process */}
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Selection Process for Academic Scholarships
          </h3>
          <p className='text-gray-700 mb-6'>
            All completed applications accompanied by all required supporting
            materials will be reviewed by the Scholarship Application Evaluation
            Committee to ensure that every applicant receives full
            consideration. Scholarships will be awarded in a manner that matches
            the higher monetary award amounts with the better-qualified
            candidates who meet all the requisite criteria. Applicants will be
            scored using a percentage system based on the following criteria:
          </p>

          {/* Scoring Table */}
          <div className='overflow-x-auto'>
            <table className='min-w-full border border-gray-300'>
              <thead>
                <tr className='bg-blue-500 text-white'>
                  <th className='py-3 px-4 border text-left'>Criteria</th>
                  <th className='py-3 px-4 border text-center'>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-gray-50'>
                  <td className='py-3 px-4 border'>Scholarship Exam</td>
                  <td className='py-3 px-4 border text-center'>70</td>
                </tr>
                <tr>
                  <td className='py-3 px-4 border'>
                    Academic Records (AY 2023-2024)
                  </td>
                  <td className='py-3 px-4 border text-center'>20</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='py-3 px-4 border'>CV & Viva</td>
                  <td className='py-3 px-4 border text-center'>10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className='text-gray-700 mt-6'>
            According to the provided table, the top 5 participants will be
            selected from the merit list for a Viva exam from each grade/class.
            The scholarship amount may vary from{' '}
            <span className='font-semibold'>20% to 90%</span> of the total
            tuition fees depending on the final decision of the IHSB Management.
          </p>
        </section>

        {/* Registration Details */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>📝</span> Scholarship Program Registration
          </h2>
          <div className='text-gray-700 space-y-2'>
            <p>
              <span className='font-semibold'>📅 Deadline:</span> 20th May, 2024
            </p>
            <p>
              <span className='font-semibold'>📍 Fee:</span> BDT 500
            </p>
            <p>
              <span className='font-semibold'>📅 Exam Date:</span> 25th May,
              2024 | 10 AM
            </p>
          </div>
        </section>

        {/* Required Documents */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>📃</span> Required Documents
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-2'>
            <li>Passport copy</li>
            <li>Two passport-size photos</li>
            <li>Transcripts of AY 2023-2024 session</li>
          </ul>
        </section>

        {/* Scholarship Award Cancellation */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>⚠️</span> Scholarship Award Cancellation
          </h2>
          <p className='text-gray-700 mb-4'>
            A student’s scholarship award can be revoked if any of the following
            conditions are found:
          </p>
          <ul className='list-disc list-inside text-gray-700 space-y-2'>
            <li>
              Students must maintain{' '}
              <span className='font-semibold'>80% or above</span> marks in their
              formative and summative assessments.
            </li>
            <li>
              They should always maintain proper discipline, and their
              behavioral marks need to be{' '}
              <span className='font-semibold'>100</span> throughout the academic
              year.
            </li>
            <li>
              They should always be respectful towards the laws of Bangladesh
              and the policies of the school.
            </li>
          </ul>
        </section>

        {/* CV Template */}
        <section className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
            <span className='mr-2'>📄</span> CV Template
          </h2>
          <div className='border p-6 rounded-lg bg-gray-50'>
            <div className='space-y-4'>
              <p>
                <span className='font-semibold'>Applicant's Name:</span>{' '}
                ______________________
              </p>
              <p>
                <span className='font-semibold'>
                  Applicant’s Address and Contact Number:
                </span>{' '}
                ______________________
              </p>
              <p>
                <span className='font-semibold'>
                  Applicant’s School Name and Address:
                </span>{' '}
                ______________________
              </p>
              <p>
                <span className='font-semibold'>
                  Achievements in Co-curricular Activities:
                </span>
              </p>
              <textarea
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={3}
                placeholder='List your achievements...'
              ></textarea>
              <p>
                <span className='font-semibold'>
                  Statement (Within 250 words):
                </span>
              </p>
              <textarea
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={4}
                placeholder='Write about your personality, character, suitability for the scholarship, and why you need the scholarship.'
              ></textarea>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className='text-center text-gray-600 text-sm mt-8'>
          📢 <span className='font-semibold'>Note:</span> Bring original
          certificates if selected for the final Viva exam.
        </div>
      </div>
    </div>
  )
}

export default ScholarshipProgram
