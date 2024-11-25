import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import type { CountryFilters } from '../types';

interface FiltersProps {
  filters: CountryFilters;
  onFilterChange: (filters: CountryFilters) => void;
  continents: string[];
  languages: string[];
}

export function Filters({ filters, onFilterChange, continents, languages }: FiltersProps) {
  return (
    <div className="glass-card p-4 rounded-xl space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 sm:items-center">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-50 rounded-lg">
          <Filter className="h-5 w-5 text-blue-500" />
        </div>
        <span className="text-sm font-semibold text-gray-700">Filters</span>
      </div>
      
      <div className="relative">
        <select
          className="filter-select pr-10"
          value={filters.continent || ''}
          onChange={(e) => onFilterChange({ ...filters, continent: e.target.value || undefined })}
        >
          <option value="">All Continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>{continent}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          className="filter-select pr-10"
          value={filters.language || ''}
          onChange={(e) => onFilterChange({ ...filters, language: e.target.value || undefined })}
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          className="filter-select pr-10"
          value={filters.sortBy || ''}
          onChange={(e) => onFilterChange({ 
            ...filters, 
            sortBy: e.target.value as 'name' | 'capital' | undefined 
          })}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="capital">Capital</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {filters.sortBy && (
        <button
          className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 
          transition-colors duration-200 font-medium text-sm focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => onFilterChange({
            ...filters,
            sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
          })}
        >
          {filters.sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
      )}
    </div>
  );
}