'use client';

import Results from '@/components/ui/results';
import React, { useState } from 'react';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('stateAndName'); // Default to 'state'
  const [stateQuery, setStateQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [results, setResults] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    let query = '';
    if (searchType === 'state') {
      query = `state=${stateQuery}`;
      if (!query.trim()) return;
    } else if (searchType === 'stateAndName') {
      if (!stateQuery.trim() || !nameQuery.trim()) return;
      query = encodeURIComponent(`state=${stateQuery}&name=${nameQuery}`);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?${query}`); // Send search type to the API
      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2a3941] text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">
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
            setNameQuery('');
          }}
          className="bg-[#496e6e] text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
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
            className="w-full px-4 py-2 bg-[#496e6e] text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
          />
        )}
        {searchType === 'stateAndName' && (
          <>
            <input
              type="text"
              placeholder="Enter State..."
              value={stateQuery}
              onChange={(e) => setStateQuery(e.target.value)}
              className="w-1/2 px-4 py-2 bg-[#496e6e] text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
            />
            <input
              type="text"
              placeholder="Enter Name..."
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              className="w-1/2 px-4 py-2 bg-[#496e6e] text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
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
