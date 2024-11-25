import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-blue-500" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search countries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}