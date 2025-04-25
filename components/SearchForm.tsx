'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  const [open, setOpen] = useState(false)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // Navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
      setOpen(false)
    }
  };
  
  return (
    <>
      <AlertDialog  open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger 
  className="flex items-center gap-2 w-full max-w-md px-4 py-2 text-left text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
>
  <Search size={18} className="text-gray-400" />
  <span className="text-sm font-normal">Search for coupons, stores...</span>
</AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Search</AlertDialogTitle>
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
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleSubmit}>Search</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

     
     
    </>
  );
};

export default SearchForm;