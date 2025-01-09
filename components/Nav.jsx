'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
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
      href: '/uttarasenior',
      subLinks: [
        {
          title: 'Uttara Senior Section',
          href: '/uttarasenior'
        },
        { title: 'Uttara Junior Section', href: '/uttarajunior' }
      ]
    },
    {
      title: 'About',
      href: '/about',
      subLinks: [
        { title: 'Option 1', href: '/about/option1' },
        { title: 'Option 2', href: '/about/option2' }
      ]
    },
    {
      title: 'Events',
      href: '/events',
      subLinks: [
        { title: 'Event 1', href: '/events/event1' },
        { title: 'Option 2', href: '/events/option2' }
      ]
    },
    {
      title: 'Contact',
      href: '#',
      subLinks: [
        { title: 'Option 1', href: '/contact/option1' },
        { title: 'Option 2', href: '/contact/option2' }
      ]
    }
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
          <span className='hidden md:block self-center text-2xl font-semibold whitespace-nowrap text-slate-800'>
            International Hope School Bangladesh
          </span>
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
              <MobileNav menuItems={menuItems} toggleMenu={toggleMenu} />
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
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ item, idx, dropdownOpen, toggleDropdown }) => (
  <li
    className='relative group'
    onMouseEnter={() => toggleDropdown(idx)}
    onMouseLeave={() => toggleDropdown(null)}
  >
    <Link
      href={item.href}
      className='block py-2 px-3 text-white bg-slate-700 rounded bg-inherit md:bg-transparent md:text-slate-700 md:p-0 mt-0'
      aria-current={item.href === '/' ? 'page' : undefined}
    >
      {item.title}
      {item.subLinks && (
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
      )}
    </Link>
    {dropdownOpen === idx && item.subLinks && (
      <div className='absolute left-0 w-44 bg-white rounded-lg shadow-lg z-10 '>
        <ul className='py-2 text-sm text-gray-700'>
          {item.subLinks.map((subItem, subIdx) => (
            <li key={subIdx}>
              <Link
                href={subItem.href}
                className='block px-4 py-2 hover:bg-gray-100'
              >
                {subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </li>
)

const MobileNav = ({ menuItems, toggleMenu }) => (
  <div className='relative grid gap-6 rounded-md bg-white p-4'>
    <nav className='grid grid-flow-row auto-rows-max text-sm'>
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className='flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline'
            onClick={toggleMenu}
          >
            {item.title}
          </Link>
          {item.subLinks &&
            item.subLinks.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                className='ml-4 flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline'
              >
                {subItem.title}
              </Link>
            ))}
        </div>
      ))}
    </nav>
  </div>
)

export default Nav
