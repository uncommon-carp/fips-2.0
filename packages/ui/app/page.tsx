// app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-teal-400">
          FIPS County Code API
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Simplifying Access to FIPS County Codes for Developers and Analysts.
        </p>
        <Link href="/search">
          <button className="mt-6 bg-teal-500 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-teal-400">
            Start Searching
          </button>
        </Link>
      </section>

      {/* About the API Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl font-semibold text-teal-400">
          What is the FIPS County Code API?
        </h2>
        <p className="mt-4 text-gray-300">
          The FIPS County Code API provides a simple way to retrieve accurate
          and up-to-date Federal Information Processing Standards (FIPS) county
          codes. Ideal for data integration, analysis, and application
          development.
        </p>
      </section>

      {/* Endpoints Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl font-semibold text-teal-400">API Endpoints</h2>
        <ul className="mt-6 space-y-4 text-gray-300">
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /counties - Retrieve all FIPS county codes
            </code>
          </li>
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /counties/{'{state}'}/ - Retrieve FIPS codes for a specific
              state
            </code>
          </li>
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /counties/{'{state}/{county}'}/ - Retrieve a specific FIPS
              code
            </code>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2025 FIPS API. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/docs">
            <button className="text-teal-400 hover:underline">
              API Documentation
            </button>
          </Link>
        </div>
      </footer>
    </main>
  );
}
