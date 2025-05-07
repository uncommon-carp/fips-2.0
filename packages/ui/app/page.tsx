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
          The FIPS County Code API is an over-engineered REST API providing US
          Federal Information Processing System (FIPS) county codes and a
          development sandbox for myself. It's based on work by Derek Swingley,
          found{' '}
          <a href="https://derekswingley.com/2019/10/13/using-the-census-api-to-get-county-fips-codes/">
            here
          </a>
        </p>
        <p className="mt-4 text-gray-300">
          Initially meant as a microservice for another project that ended up
          not needing it, this API has become my go-to for technology and
          concept testing. Now in it's third iteration, it's built in Typescript
          and Next.js on AWS. This version will be in continuous development,
          with a few new features planned for the near future.
        </p>
      </section>

      {/* How to Use the API Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl font-semibold text-teal-400">
          How do I use it?
        </h2>
        <p className="mt-4 text-gray-300">
          The API accepts GET requests to one of two endpoints. The index
          endpoint needs no query parameters, while 'counties' takes either just
          a 'state' or both a 'state' and 'county' parameters. Easy peasy.
          <code className="block bg-gray-800 p-4 mt-4 rounded-lg">
            Base URL: https://api.fips.codes/
          </code>
        </p>

        <h3 className="text-xl font-semibold mt-4 text-teal-400">
          API Endpoints
        </h3>
        <ul className="mt-6 space-y-4 text-gray-300">
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /index - Retrieve all FIPS county codes
            </code>
          </li>
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /counties?state=STATE_NAME - Retrieve FIPS codes for a
              specific state
            </code>
          </li>
          <li>
            <code className="block bg-gray-800 p-4 rounded-lg">
              GET /counties?state=STATE_NAME&county=COUNTY_NAME - Retrieve a
              specific FIPS code
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
