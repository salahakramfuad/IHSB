'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null)
  const dropdownRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen(mobileDropdownOpen === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { title: 'Home', href: '/' },
    {
      title: 'Branches',
      subLinks: [
        { title: 'Uttara Senior Section', href: '/uttarasenior' },
        { title: 'Uttara Junior Section', href: '/uttarajunior' },
        { title: 'Gulshan Primary & Middle Section', href: '/gulshanbranch' }
      ]
    },
    {
      title: 'Achievements',
      subLinks: [
        { title: '  Sports  ', href: '/achievements/sports' },
        {
          title: 'Academic Achievements',
          href: '/achievements/academicachievement'
        },
        { title: 'Alumni', href: '/achievements/alumni' }
      ]
    },
    {
      title: 'Academics',
      subLinks: [
        { title: 'Curriculumn', href: '/academics/curriculumn' },
        { title: 'Academic Calendar', href: '/academics/calendar' },
        {
          title: 'Extracurricular Activities',
          href: '/academics/extracurricular'
        },
        {
          title: 'Clubs',
          href: '/academics/clubs'
        },
        {
          title: 'Scholarship',
          href: '/academics/scholarship'
        },
        {
          title: 'Publicstions',
          href: '/academics/publication'
        }
      ]
    },
    {
      title: 'Admissions',
      subLinks: [
        { title: 'Admission Procedure', href: '/admissionprocedure' },
        { title: 'Fees', href: '/fees' }
      ]
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Events',
      href: '/events'
    },
    { title: 'Contact', href: '/contact' }
  ]

  return (
    <nav className='bg-slate-50 border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image
            src='/assets/images/logo.png'
            alt='Logo'
            width={60}
            height={60}
            className='object-contain'
          />
          <div className='hidden md:flex flex-col self-center text-xl font-semibold whitespace-nowrap text-slate-800'>
            <span className='w-full text-center'>International Hope</span>
            <span className='w-full text-center'>School Bangladesh</span>
          </div>
        </Link>
        <button
          onClick={toggleMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          aria-controls='navbar-multi-level'
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        {isOpen && (
          <div className='fixed inset-0 z-40'>
            <div className='fixed top-0 right-0 w-2/4 max-w-sm h-full bg-slate-300 shadow-lg z-50 p-4'>
              <button
                onClick={toggleMenu}
                className='text-gray-500 hover:bg-gray-200 rounded p-2 mb-4'
              >
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
              <MobileNav
                menuItems={menuItems}
                toggleMenu={toggleMenu}
                mobileDropdownOpen={mobileDropdownOpen}
                toggleMobileDropdown={toggleMobileDropdown}
              />
            </div>
          </div>
        )}
        <div
          className='hidden w-full md:block md:w-auto mt-0'
          id='navbar-multi-level'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-inherit md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-inherit'>
            {menuItems.map((item, idx) => (
              <NavItem
                key={idx}
                item={item}
                idx={idx}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                dropdownRef={dropdownRef}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ item, idx, dropdownOpen, toggleDropdown, dropdownRef }) => (
  <li className='relative group'>
    {item.subLinks ? (
      <div className='relative'>
        {/* Main dropdown trigger */}
        <button
          className='flex items-center py-2 px-3 text-slate-700 md:p-0 mt-0 hover:text-blue-600 transition-colors'
          onClick={() => toggleDropdown(idx)}
        >
          {item.title}
          <svg
            className={`w-4 h-4 ml-2 inline transition-transform duration-200 ${
              dropdownOpen === idx ? 'rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>

        {/* Dropdown content */}
        {dropdownOpen === idx && (
          <div
            ref={dropdownRef}
            className='absolute left-0 top-full w-44 bg-white rounded-lg shadow-lg z-50 mt-1'
          >
            <ul className='py-2 text-sm text-gray-700'>
              {item.subLinks.map((subItem, subIdx) => (
                <li key={subIdx}>
                  <Link
                    href={subItem.href}
                    className='block px-4 py-2 hover:bg-gray-100 w-full text-left'
                    onClick={() => toggleDropdown(null)} // Close the dropdown when link is clicked
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ) : (
      <Link
        href={item.href}
        className='block py-2 px-3 text-slate-700 rounded md:bg-transparent md:p-0 mt-0 hover:text-blue-600 transition-colors'
      >
        {item.title}
      </Link>
    )}
  </li>
)

const MobileNav = ({
  menuItems,
  toggleMenu,
  mobileDropdownOpen,
  toggleMobileDropdown
}) => (
  <nav className='grid gap-2'>
    {menuItems.map((item, index) => (
      <div key={index} className='space-y-2'>
        {item.subLinks ? (
          <div>
            <button
              onClick={() => toggleMobileDropdown(index)}
              className='flex w-full items-center justify-between p-2 text-sm font-medium hover:bg-gray-100 rounded-md'
            >
              <span>{item.title}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  mobileDropdownOpen === index ? 'rotate-180' : ''
                }`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            {mobileDropdownOpen === index && (
              <div className='ml-4 space-y-2'>
                {item.subLinks.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    onClick={toggleMenu}
                    className='block p-2 text-sm hover:bg-gray-100 rounded-md'
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            onClick={toggleMenu}
            className='flex w-full items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md'
          >
            {item.title}
          </Link>
        )}
      </div>
    ))}
  </nav>
)

export default Nav
