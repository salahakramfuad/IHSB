import React from 'react'

const ApplicationProcedure = () => {
  return (
    <div className='bg-gray-100 min-h-screen py-8'>
      <div className='max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Application Procedure
          </h1>
          <p className='mt-2 text-gray-600'>
            International Hope School Bangladesh (IHSB)
          </p>
        </div>

        {/* Academic Year Information */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Academic Year</h2>
          <p className='mt-2 text-gray-700'>
            The academic year begins in July and ends in June. View the Academic
            Calendar for all important dates.
          </p>
        </div>

        {/* Steps Section */}
        <div className='space-y-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
              Steps to Apply
            </h2>
            <div className='space-y-6'>
              {/* Step 1 */}
              <div className='flex items-start bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mr-4'>
                  <span className='text-white text-xl font-bold'>1</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Collect an Application Form
                  </h3>
                  <p className='text-gray-700'>
                    Purchase the form for $17.7 from the school office. It must
                    be submitted by the last date notified by the school
                    management.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className='flex items-start bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mr-4'>
                  <span className='text-white text-xl font-bold'>2</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Submit Required Documents
                  </h3>
                  <p className='text-gray-700'>
                    Submit the Admission Application Form along with:
                  </p>
                  <ul className='list-disc list-inside mt-2 space-y-1 text-gray-700'>
                    <li>
                      2 recent passport-size photos of the student (in color).
                    </li>
                    <li>
                      A photocopy of the Birth Certificate attested by a
                      Notary Public.
                    </li>
                    <li>A photocopy of the last year's report card.</li>
                    <li>
                      Business cards of parents or guardians (if available).
                    </li>
                    <li>Passport photocopy of the student (if available).</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className='flex items-start bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full mr-4'>
                  <span className='text-white text-xl font-bold'>3</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Appear for Admission Test
                  </h3>
                  <p className='text-gray-700'>
                    Prior to admission, pupils are required to appear for an
                    admission test.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className='flex items-start bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mr-4'>
                  <span className='text-white text-xl font-bold'>4</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Attend Interview
                  </h3>
                  <p className='text-gray-700'>
                    Following the admission test, an interview will be conducted
                    with the students and parents.
                  </p>
                </div>
              </div>
              {/* step 5*/}
              <div className='flex items-start bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center justify-center w-16 h-12 bg-purple-500 rounded-full mr-4'>
                  <span className='text-white text-xl font-bold'>4</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    Complete Admission Process
                  </h3>
                  <p className='text-gray-700'>
                    Selected candidates must complete the admission process
                    within seven days by paying the admission fee and submitting
                    all necessary documents; otherwise, the admission result
                    will not be valid.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              General Instructions for Admission
            </h2>
            <div className='space-y-4'>
              {/* Instruction 1 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white font-bold mr-4'>
                  1
                </div>
                <p className='text-gray-700'>
                  The Admission Application Form is available at the respective
                  school offices and must be submitted by the last date notified
                  by the school management.
                </p>
              </div>

              {/* Instruction 2 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white font-bold mr-4'>
                  2
                </div>
                <p className='text-gray-700'>
                  It is the parent's responsibility to submit all required
                  documents with the Admission Contract.
                </p>
              </div>

              {/* Instruction 3 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full text-white font-bold mr-4'>
                  3
                </div>
                <p className='text-gray-700'>
                  Prior to admission, pupils are required to appear for an
                  admission test.
                </p>
              </div>

              {/* Instruction 4 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-red-500 rounded-full text-white font-bold mr-4'>
                  4
                </div>
                <p className='text-gray-700'>
                  Following the admission test, an interview will be conducted
                  with the students and parents. Admission test results will be
                  announced or communicated via phone calls within 3-5 days.
                </p>
              </div>

              {/* Instruction 5 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full text-white font-bold mr-4'>
                  5
                </div>
                <p className='text-gray-700'>
                  Selected candidates must complete the admission process within
                  seven days by paying the admission fee and submitting all
                  necessary documents; otherwise, the admission result will not
                  be valid.
                </p>
              </div>

              {/* Instruction 6 */}
              <div className='flex items-start'>
                <div className='flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full text-white font-bold mr-4'>
                  6
                </div>
                <p className='text-gray-700'>
                  The school management reserves the right to reject a candidate
                  at any stage of the admission process, and the school is not
                  bound to provide reasons.
                </p>
              </div>
            </div>
          </div>

          {/* Admission Policy */}
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              Admission Policy
            </h2>
            <ul className='list-disc list-inside mt-2 text-gray-700 space-y-2'>
              <li>
                In case parents fail to submit the required documents, they must
                submit an application explaining the reason.
              </li>
              <li>
                Acceptance of the admission application form does not
                necessarily mean admittance of a candidate to school.
              </li>
              <li>
                Any admission application form containing incorrect or false
                information will result in rejection or discontinuation from the
                school.
              </li>
              <li>
                IHSB does admit students outside the standard admission
                schedule.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Age Limits for Each Grade
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Column 1 */}
              <div>
                <table className='min-w-full bg-gray-50 divide-y divide-gray-200'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                        Class
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                        Minimum Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Toddler
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>2+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>PG</td>
                      <td className='px-4 py-2 text-sm text-gray-700'>3+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Nursery
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>4+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>KG 1</td>
                      <td className='px-4 py-2 text-sm text-gray-700'>5+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>KG 2</td>
                      <td className='px-4 py-2 text-sm text-gray-700'>6+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 1
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>7+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 2
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>8+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 3
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>9+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 4
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>10+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Column 2 */}
              <div>
                <table className='min-w-full bg-gray-50 divide-y divide-gray-200'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                        Class
                      </th>
                      <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                        Minimum Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 5
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>11+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 6
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>12+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 7
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>13+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 8
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>14+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 9
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>15+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 10
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>16+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 11
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>17+</td>
                    </tr>
                    <tr>
                      <td className='px-4 py-2 text-sm text-gray-700'>
                        Class 12
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-700'>18+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className='text-xl font-semibold text-gray-800'>Contact Us</h2>
            <p className='mt-2 text-gray-700'>
              International Hope School Bangladesh
              <br />
              Plot: 7, Road: 6, Sec: 4 Uttara, Dhaka-1230.
              <br />
              Tel: +880.2.48956999, 48953722-3
              <br />
              Fax: +880.2.48954242
              <br />
              Email: info@ihsb.edu.bd
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationProcedure
