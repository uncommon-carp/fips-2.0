'use client';

import Results from '@/components/ui/results';
import React, { useState } from 'react';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('stateAndName'); // Default to 'state'
  const [stateQuery, setStateQuery] = useState('');
  const [countyQuery, setCountyQuery] = useState('');
  const [results, setResults] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // page.tsx (Updated handleSearch function)

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null); // Clear previous results

    // Use URLSearchParams to build the query string safely
    const params = new URLSearchParams();

    // Basic validation: Ensure state is provided
    if (!stateQuery.trim()) {
      setError('State cannot be empty.');
      setLoading(false);
      return; // Stop if state is missing
    }
    params.append('state', stateQuery.trim()); // Add state

    // Add name only if the search type requires it and it's not empty
    if (searchType === 'stateAndName') {
      if (!countyQuery.trim()) {
        setError('Name cannot be empty when searching by state and name.');
        setLoading(false);
        return; // Stop if name is missing for this search type
      }
      params.append('county', countyQuery.trim()); // Add name
    }

    // The query string is now correctly formatted by params.toString()
    const queryString = params.toString();
    const apiUrl = `/api/search?${queryString}`;
    console.log('Fetching URL:', apiUrl); // Good for debugging

    try {
      const response = await fetch(apiUrl);

      // Improved error handling: try to parse error JSON from API
      if (!response.ok) {
        let errorMsg = `Failed to fetch results. Status: ${response.status}`;
        try {
          // See if the API route sent back a JSON error message
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error; // Use the specific error from the API
          }
        } catch (e) {
          console.error(e);
          // Ignore if the error response wasn't JSON
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Show the specific error message
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Search failed:', err); // Log the full error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center py-10">
      <h1 className="text-3xl text-teal-400 font-bold mb-6">
        {searchType === 'state'
          ? 'List All Counties For A State'
          : 'Get A Single County'}
      </h1>
      <div className="mb-4">
        <label htmlFor="searchType" className="mr-2 text-gray-300">
          Search By:
        </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setStateQuery(''); // Reset queries when search type changes
            setCountyQuery('');
          }}
          className="bg-gray-600 text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
        >
          <option value="state">By State</option>
          <option value="stateAndName">By State and Name</option>
        </select>
      </div>
      <div className="w-full max-w-xl flex gap-2">
        {searchType === 'state' && (
          <input
            type="text"
            placeholder="Enter State..."
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-600 text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
          />
        )}
        {searchType === 'stateAndName' && (
          <>
            <input
              type="text"
              placeholder="Enter State..."
              value={stateQuery}
              onChange={(e) => setStateQuery(e.target.value)}
              className="w-1/2 px-4 py-2 bg-gray-600 text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
            />
            <input
              type="text"
              placeholder="Enter Name..."
              value={countyQuery}
              onChange={(e) => setCountyQuery(e.target.value)}
              className="w-1/2 px-4 py-2 bg-gray-600 text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
            />
          </>
        )}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-[#a1d9d2] text-black font-bold rounded hover:bg-[#89cbbf] disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="w-full max-w-xl mt-6">
        {results !== null ? <Results results={results} /> : null}
      </div>
    </div>
  );
};

export default SearchPage;
