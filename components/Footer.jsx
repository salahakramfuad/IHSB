'use client'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        {/* Logo and Description */}
        <div className='sm:flex sm:justify-between mb-6'>
          <div className='w-full sm:w-2/5 mb-6 sm:mb-0 text-center sm:text-center lg:text-center'>
            <Link
              href='/app/page.jsx'
              className='flex justify-center sm:justify-center '
            >
              <Image
                src='/assets/images/logo.png'
                alt='Logo'
                width={80}
                height={80}
              />
            </Link>
            <p className='mt-4 text-center text-gray-400 sm:text-center lg:text-center'>
              International Hope School Bangladesh
            </p>
          </div>

          {/* Quick Links */}
          <div className='w-full sm:w-1/5 mb-6 sm:mb-0 flex flex-col items-center sm:items-start'>
            <h3 className='font-semibold mb-4 text-center sm:text-left'>
              Quick Links
            </h3>
            <div className='flex flex-col space-y-2'>
              <Link href='/' className='text-gray-400 hover:text-white'>
                Home
              </Link>
              <Link href='/about' className='text-gray-400 hover:text-white'>
                About
              </Link>
              <Link href='/events' className='text-gray-400 hover:text-white'>
                Events
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className='w-full sm:w-2/5 mb-6 sm:mb-0'>
            <h3 className='font-semibold mb-4 text-center sm:text-left'>
              Contact Information
            </h3>
            <div className='text-gray-400 text-sm space-y-2 text-center sm:text-left'>
              <p>
                <strong>Address:</strong> Plot: 7, Road: 6, Sector: 4, Uttara,
                Dhaka-1230
              </p>
              <p>
                <strong>Phone:</strong> +880 2 4895 6999, 017 0605 4122
              </p>
              <p>
                <strong>Email:</strong> info@ihsb.edu.bd
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='border-t border-gray-700 pt-4 text-center'>
          <div className='flex justify-center space-x-4 mb-4'>
            <Link
              href='https://www.facebook.com/ihsbd.net'
              className='text-gray-400 hover:text-white'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M22.675 0h-21.35c-.735 0-1.325.59-1.325 1.325v21.351c0 .734.59 1.324 1.325 1.324h21.351c.734 0 1.324-.59 1.324-1.325v-21.35c0-.735-.59-1.325-1.325-1.325zm-13.676 20.506v-8.541h-2.873v-3.373h2.873v-2.496c0-2.849 1.739-4.401 4.277-4.401 1.214 0 2.257.09 2.558.131v2.963l-1.756.001c-1.376 0-1.643.654-1.643 1.616v2.186h3.285l-.428 3.373h-2.857v8.541h-3.422z' />
              </svg>
            </Link>
            <Link
              href='https://www.twitter.com'
              className='text-gray-400 hover:text-white'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M24 4.557a9.831 9.831 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.84 9.84 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.978 13.978 0 01-10.15-5.145 4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.096 4.906 4.906 0 01-2.228-.616c-.053 1.98 1.376 3.838 3.407 4.252a4.903 4.903 0 01-2.224.084 4.923 4.923 0 004.598 3.417 9.865 9.865 0 01-7.27 2.014 13.935 13.935 0 007.548 2.209c9.055 0 14.002-7.496 14.002-13.986 0-.214-.004-.428-.014-.641a9.936 9.936 0 002.451-2.539z' />
              </svg>
            </Link>
            <Link
              href='https://www.instagram.com/lifeatihsb'
              className='text-gray-400 hover:text-white'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.315 3.608 1.29s1.228 2.242 1.29 3.608c.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.315 2.633-1.29 3.608s-2.242 1.228-3.608 1.29c-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.315-3.608-1.29s-1.228-2.242-1.29-3.608c-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.315-2.633 1.29-3.608s2.242-1.228 3.608-1.29c1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.257 0-3.667.012-4.947.072-1.597.072-3.047.328-4.183 1.464-1.136 1.136-1.392 2.586-1.464 4.183-.06 1.281-.072 1.69-.072 4.947s.012 3.667.072 4.947c.072 1.597.328 3.047 1.464 4.183 1.136 1.136 2.586 1.392 4.183 1.464 1.281.06 1.69.072 4.947.072s3.667-.012 4.947-.072c1.597-.072 3.047-.328 4.183-1.464 1.136-1.136 1.392-2.586 1.464-4.183.06-1.281.072-1.69.072-4.947s-.012-3.667-.072-4.947c-.072-1.597-.328-3.047-1.464-4.183-1.136-1.136-2.586-1.392-4.183-1.464-1.281-.06-1.69-.072-4.947-.072zm0 5.838c-3.41 0-6.186 2.776-6.186 6.186s2.776 6.186 6.186 6.186 6.186-2.776 6.186-6.186-2.776-6.186-6.186-6.186zm0 10.185c-2.21 0-3.999-1.789-3.999-3.999s1.789-3.999 3.999-3.999 3.999 1.789 3.999 3.999-1.789 3.999-3.999 3.999zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z' />
              </svg>
            </Link>
            <Link
              href='https://www.linkedin.com/company/international-hope-school-bangladesh'
              className='text-gray-400 hover:text-white'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M22.225 0h-20.449c-.982 0-1.776.794-1.776 1.776v20.449c0 .982.794 1.776 1.776 1.776h20.449c.982 0 1.776-.794 1.776-1.776v-20.449c0-.982-.794-1.776-1.776-1.776zm-15.434 20.452h-3.675v-10.452h3.675zm-1.837-11.977c-1.17 0-2.118-.947-2.118-2.117s.947-2.118 2.118-2.118 2.118.947 2.118 2.118-.947 2.117-2.118 2.117zm14.195 11.977h-3.676v-5.678c0-1.352-.025-3.09-1.883-3.09-1.886 0-2.176 1.471-2.176 2.987v5.781h-3.675v-10.452h3.529v1.423h.049c.492-.93 1.69-1.914 3.479-1.914 3.717 0 4.405 2.447 4.405 5.623v5.32z' />
              </svg>
            </Link>
          </div>
          <p className='text-gray-400'>
            &copy; {new Date().getFullYear()} International Hope School
            Bangladesh. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
