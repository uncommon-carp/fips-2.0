'use client';

import Results from '@/components/ui/results';
import React, { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${query}`);
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
        Search by City, State, or County
      </h1>
      <p className="text-gray-300 mb-4">
        Enter a city and state (e.g., "Austin, TX") or a county name (e.g.,
        "Travis County").
      </p>
      <div className="w-full max-w-xl flex gap-2">
        <input
          type="text"
          placeholder="City, State or County Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-[#496e6e] text-white border border-[#a1d9d2] rounded focus:outline-none focus:ring-2 focus:ring-[#a1d9d2]"
        />
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
