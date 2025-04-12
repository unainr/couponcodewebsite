'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchFormProps {
  initialQuery?: string;
  className?: string;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  initialQuery = '',
  className = '',
  placeholder = 'Search for coupons, stores...'
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // Navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Submit search"
        disabled={!searchQuery.trim()}
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchForm;