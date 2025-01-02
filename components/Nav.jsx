'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50 w-full'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/images/logo.png'
            alt='Logo'
            width={60}
            height={60}
            className='object-contain'
          />
          <p className='max-sm:hidden font-inter font-semibold text-lg text-slate-700 tracking-wide'>
            International Hope School Bangladesh
          </p>
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          className='inline-flex items-center p-2 text-gray-600 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300'
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

        {/* Navigation Links */}
        <div
          className={`absolute top-[70px] right-4 bg-white shadow-lg rounded-md transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          } md:static md:flex md:space-x-8 md:bg-transparent md:shadow-none md:rounded-none`}
          id='navbar-default'
        >
          <div className='flex flex-col md:flex-row md:items-center'>
            {/* Home */}
            <div className='relative group'>
              <Link href='/' className='nav_list'>
                Home
              </Link>
            </div>

            {/* BRANCHES */}
            <div className='relative group'>
              <Link href='/' className='nav_list'>
                Branches
              </Link>
              <div
                className='absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-10 min-w-[150px]
                transition-all duration-300
                sm:left-[-160px] sm:top-0
                md:top-full md:left-0 md:mt-2'
              >
                <Link href='/uttarasenior' className='dropdown_item'>
                  Uttara Senior Section
                </Link>
                <Link href='/about/option2' className='dropdown_item'>
                  Option 2
                </Link>
              </div>
            </div>
            {/* About */}
            <div className='relative group'>
              <Link href='/about' className='nav_list'>
                About
              </Link>
              <div
                className='absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-10 min-w-[150px]
                transition-all duration-300
                sm:left-[-160px] sm:top-0
                md:top-full md:left-0 md:mt-2'
              >
                <Link href='/about/option1' className='dropdown_item'>
                  Option 1
                </Link>
                <Link href='/about/option2' className='dropdown_item'>
                  Option 2
                </Link>
              </div>
            </div>

            {/* Events */}
            <div className='relative group'>
              <Link href='/events' className='nav_list'>
                Events
              </Link>
              <div
                className='absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-10 min-w-[150px]
                transition-all duration-300
                sm:left-[-160px] sm:top-0
                md:top-full md:left-0 md:mt-2'
              >
                <Link href='/events/option1' className='dropdown_item'>
                  Option 1
                </Link>
                <Link href='/events/option2' className='dropdown_item'>
                  Option 2
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className='relative group'>
              <Link href='/contact' className='nav_list'>
                Contact
              </Link>
              <div
                className='absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-10 min-w-[150px]
                transition-all duration-300
                sm:left-[-160px] sm:top-0
                md:top-full md:left-0 md:mt-2'
              >
                <Link href='/contact/option1' className='dropdown_item'>
                  Option 1
                </Link>
                <Link href='/contact/option2' className='dropdown_item'>
                  Option 2
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
