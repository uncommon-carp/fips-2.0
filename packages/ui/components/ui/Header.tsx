'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/docs', label: 'API Docs' },
  ];

  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Title/Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-200">
            FIPS API
          </a>
        </Link>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-gray-300 hover:text-teal-400 focus:outline-none focus:text-teal-400 transition-colors duration-200 text-2xl" // Added text-2xl for icon size
          >
            {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-4 md:space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} legacyBehavior>
                <a className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-gray-700">
          <ul className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} legacyBehavior>
                  <a
                    className="block text-gray-300 hover:text-teal-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)} // Optional: close menu on link click
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
