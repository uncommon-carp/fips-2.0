import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Title/Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-200">
            FIPS API
          </a>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4 md:space-x-6 items-center">
          <li>
            <Link href="/" legacyBehavior>
              <a className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/search" legacyBehavior>
              <a className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                Search
              </a>
            </Link>
          </li>
          <li>
            <Link href="/docs" legacyBehavior>
              <a className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                API Docs
              </a>
            </Link>
          </li>
          {/* You can add more navigation links here if needed */}
        </ul>
      </div>
    </nav>
  );
}
