import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function SearchWidget() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null);

  useEffect(() => {
    fetch('/api/search-index.json')
      .then(res => res.json())
      .then(data => {
        const fuse = new Fuse(data, {
          keys: ['title', 'content'],
          threshold: 0.3,
        });
        setSearchIndex(fuse);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (searchIndex && value) {
      setResults(searchIndex.search(value).slice(0, 5));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search posts..."
        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden">
          {results.map(({ item }) => (
            <a
              key={item.slug}
              href={`/post/${item.slug}`}
              className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b last:border-none border-slate-50"
            >
              <div className="font-bold text-slate-900">{item.title}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
