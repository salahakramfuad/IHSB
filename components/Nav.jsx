'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='flex-between w-full mb-16 pt-3 px-2 sm:px-4 py-2.5 rounded z-0'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/images/logo.png'
            alt='Logo'
            width={60}
            height={60}
            className='object-contain'
          />
          <p className='max-sm:hidden font-inter font-semibold text-lg text-slate-700 tracking-wide'>
            International Hope School <br /> Bangladesh Hostel
          </p>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200'
          aria-controls='navbar-default'
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isOpen ? '' : 'hidden'
          } w-full md:block md:w-auto text-right `}
          id='navbar-default'
        >
          <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
            <li>
              <Link href='/' className='nav_list'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/about' className='nav_list'>
                About
              </Link>
            </li>
            <li>
              <Link href='/services' className='nav_list'>
                Services
              </Link>
            </li>
            <li>
              <Link href='/contact' className='nav_list'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
