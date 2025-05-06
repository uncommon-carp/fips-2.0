// pages/docs.js (or any other route you prefer)
import Link from 'next/link';

export default function ApiDocumentationPage() {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 md:px-16">
          <h1 className="text-3xl font-bold text-teal-400">
            FIPS API Documentation
          </h1>
          <p className="mt-2 text-gray-300">
            Your guide to using the FIPS County Code API.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-12 px-6 md:px-16">
        {/* Base URL Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-400 border-b border-teal-400 pb-2">
            Base URL
          </h2>
          <p className="mt-4 text-gray-300">
            All API endpoints are relative to the following base URL:
          </p>
          <code className="block bg-gray-800 p-4 rounded-lg mt-2 text-gray-100">
            https://api.fips.codes/
          </code>
        </section>

        {/* Data Shapes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-400 border-b border-teal-400 pb-2">
            Data Shapes
          </h2>
          <p className="mt-4 text-gray-300">
            The API returns data in two main shapes depending on the endpoint.
          </p>

          <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">
            1. County-Specific Data (for <code>/counties</code> routes)
          </h3>
          <p className="text-gray-300">
            When querying for specific states or counties using the{' '}
            <code>/counties</code> endpoint, the response for a single county
            record (or an array of these records) will be in the following JSON
            format:
          </p>
          <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
            <code className="language-json text-gray-100">
              {`{
  "stateAbbrev": "AL",
  "state": "ALABAMA",
  "stateFips": "01",
  "county": "BIBB COUNTY",
  "fips": "01007"
}`}
            </code>
          </pre>
          <ul className="mt-4 list-disc list-inside text-gray-300">
            <li>
              <code>stateAbbrev</code>: The 2-letter abbreviation for the state.
            </li>
            <li>
              <code>state</code>: The full name of the state.
            </li>
            <li>
              <code>stateFips</code>: The 2-digit FIPS code for the state.
            </li>
            <li>
              <code>county</code>: The full name of the county.
            </li>
            <li>
              <code>fips</code>: The 5-digit FIPS code for the county (combining
              state and county codes).
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-teal-400 mt-6 mb-2">
            2. All States Data (for <code>/index</code> route)
          </h3>
          <p className="text-gray-300">
            The <code>/index</code> route returns a single JSON object. Each key
            in this object is a state abbreviation. The value for each state key
            is an object containing state metadata (<code>_name</code>,{' '}
            <code>_fips</code>, <code>_abbrev</code>) and then a series of
            key-value pairs where the key is the county name and the value is
            its FIPS code.
          </p>
          <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
            <code className="language-json text-gray-100">
              {`{
  "AL": {
    "_name": "Alabama",
    "_fips": "01",
    "_abbrev": "AL",
    "Autauga County": "01001",
    "Baldwin County": "01003",
    "Bibb County": "01007",
    "Chambers County": "01017",
    "Cherokee County": "01019"
    // ... other counties in Alabama
  },
  "AK": {
    "_name": "Alaska",
    "_fips": "02",
    "_abbrev": "AK",
    "Aleutians East Borough": "02013",
    // ... other boroughs/census areas in Alaska
  }
  // ... other states
}`}
            </code>
          </pre>
        </section>

        {/* API Endpoints Section */}
        <section>
          <h2 className="text-2xl font-semibold text-teal-400 border-b border-teal-400 pb-2 mb-6">
            API Endpoints
          </h2>

          {/* Endpoint 1: Get All FIPS County Codes by State */}
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-400 mb-2">
              Retrieve All FIPS County Codes (Grouped by State)
            </h3>
            <p className="text-gray-300 mb-3">
              Provides a single JSON object containing all FIPS county codes,
              grouped by state. Each state entry includes state metadata and a
              list of its counties with their respective FIPS codes. Refer to
              "Data Shapes - All States Data" for the response structure.
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-teal-500 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
                GET
              </span>
              <code className="text-gray-100 bg-gray-700 px-2 py-1 rounded">
                /index
              </code>
            </div>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Parameters:
            </h4>
            <p className="text-gray-300">None.</p>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Success 200):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`{
  "AL": {
    "_name": "Alabama",
    "_fips": "01",
    "_abbrev": "AL",
    "Autauga County": "01001",
    "Baldwin County": "01003",
    "Barbour County": "01005",
    "Bibb County": "01007",
    "Blount County": "01009",
    "Bullock County": "01011",
    "Butler County": "01013",
    "Calhoun County": "01015",
    "Chambers County": "01017",
    "Cherokee County": "01019",
    "Chilton County": "01021",
    "Choctaw County": "01023",
    "Clarke County": "01025",
    "Clay County": "01027",
    "Cleburne County": "01029",
    "Coffee County": "01031"
    // ... etc. for all counties in Alabama
  },
  "AK": {
    // ... Alaska data
  }
  // ... other states
}`}
              </code>
            </pre>
          </div>

          {/* Endpoint 2: Get FIPS Codes for a Specific State */}
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-400 mb-2">
              Retrieve FIPS Codes for a Specific State
            </h3>
            <p className="text-gray-300 mb-3">
              Fetches all FIPS county codes for a given state name. The response
              is an array of county objects. Refer to "Data Shapes -
              County-Specific Data" for the response structure of each item in
              the array.
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-teal-500 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
                GET
              </span>
              <code className="text-gray-100 bg-gray-700 px-2 py-1 rounded">
                /counties?state=STATE_NAME
              </code>
            </div>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Query Parameters:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full mt-1 border-collapse">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Parameter
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Type
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Required
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  <tr>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      <code>state</code>
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      String
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      Yes
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      The full name of the state (e.g., <code>ALABAMA</code>,{' '}
                      <code>California</code>). Case-insensitive matching is
                      recommended.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Request:
            </h4>
            <code className="block bg-gray-900 p-2 rounded-md mt-2 text-gray-100">
              GET https://api.fips.codes/counties?state=ALABAMA
            </code>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Success 200):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`[
  {
    "stateAbbrev": "AL",
    "state": "ALABAMA",
    "stateFips": "01",
    "county": "AUTAUGA COUNTY",
    "fips": "01001"
  },
  {
    "stateAbbrev": "AL",
    "state": "ALABAMA",
    "stateFips": "01",
    "county": "BALDWIN COUNTY",
    "fips": "01003"
  }
  // ... other counties in Alabama
]`}
              </code>
            </pre>
            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Error 404 - State Not Found):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`{
  "error": "State not found: NONEXISTENTSTATE"
}`}
              </code>
            </pre>
          </div>

          {/* Endpoint 3: Get a Specific FIPS Code */}
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-400 mb-2">
              Retrieve a Specific FIPS Code
            </h3>
            <p className="text-gray-300 mb-3">
              Retrieves the FIPS code for a specific county within a specific
              state. The response is a single county object. Refer to "Data
              Shapes - County-Specific Data" for the response structure.
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-teal-500 text-gray-900 px-3 py-1 rounded-md text-sm font-semibold">
                GET
              </span>
              <code className="text-gray-100 bg-gray-700 px-2 py-1 rounded">
                /counties?state=STATE_NAME&county=COUNTY_NAME
              </code>
            </div>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Query Parameters:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full mt-1 border-collapse">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Parameter
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Type
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Required
                    </th>
                    <th className="border border-gray-600 px-3 py-2 text-left text-sm font-medium text-gray-100">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  <tr>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      <code>state</code>
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      String
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      Yes
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      The full name of the state (e.g., <code>ALABAMA</code>,{' '}
                      <code>California</code>). Case-insensitive matching is
                      recommended.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      <code>county</code>
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      String
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      Yes
                    </td>
                    <td className="border border-gray-600 px-3 py-2 text-sm text-gray-300">
                      The name of the county (e.g., <code>BIBB COUNTY</code>,{' '}
                      <code>Los Angeles County</code>). Case-insensitive
                      matching is recommended.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Request:
            </h4>
            <code className="block bg-gray-900 p-2 rounded-md mt-2 text-gray-100">
              GET https://api.fips.codes/counties?state=ALABAMA&county=BIBB
              COUNTY
            </code>

            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Success 200):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`{
  "stateAbbrev": "AL",
  "state": "ALABAMA",
  "stateFips": "01",
  "county": "BIBB COUNTY",
  "fips": "01007"
}`}
              </code>
            </pre>
            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Error 404 - County Not Found):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`{
  "error": "County not found: NONEXISTENT COUNTY in ALABAMA"
}`}
              </code>
            </pre>
            <h4 className="font-semibold text-teal-400 mt-4 mb-2">
              Example Response (Error 404 - State Not Found):
            </h4>
            <pre className="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto">
              <code className="language-json text-gray-100">
                {`{
  "error": "State not found: NONEXISTENTSTATE"
}`}
              </code>
            </pre>
          </div>
        </section>

        {/* Error Handling Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-400 border-b border-teal-400 pb-2">
            Error Handling
          </h2>
          <p className="mt-4 text-gray-300">
            The API uses standard HTTP status codes to indicate the success or
            failure of an API request.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-300">
            <li>
              <code>200 OK</code>: The request was successful.
            </li>
            <li>
              <code>400 Bad Request</code>: The request was malformed (e.g.,
              missing required parameters).
            </li>
            <li>
              <code>404 Not Found</code>: The requested resource (e.g., state or
              county) could not be found.
            </li>
            <li>
              <code>500 Internal Server Error</code>: Something went wrong on
              our end. (Please contact support if this persists)
            </li>
          </ul>
          <p className="mt-4 text-gray-300">
            Error responses will typically include a JSON object with an{' '}
            <code>error</code> key describing the issue.
          </p>
          <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
            <code className="language-json text-gray-100">
              {`// Example Error Response
{
  "error": "Specific error message here"
}`}
            </code>
          </pre>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} FIPS API. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/" legacyBehavior>
            <a className="text-teal-400 hover:underline">Home</a>
          </Link>
        </div>
      </footer>
    </main>
  );
}
