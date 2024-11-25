import React from 'react';
import type { Country } from '../types';
import { MapPin, Globe, Phone } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export function CountryCard({ country, onClick }: CountryCardProps) {
  return (
    <div className="country-card" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl animate-bounce-slow">{country.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
            <p className="text-sm font-medium text-blue-600">{country.continent.name}</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-500" />
            </div>
            <span className="font-medium">{country.capital || 'No capital'}</span>
          </div>
          
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="p-1.5 bg-indigo-50 rounded-lg">
              <Globe className="h-4 w-4 text-indigo-500" />
            </div>
            <span className="font-medium">{country.languages.map(l => l.name).join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="p-1.5 bg-purple-50 rounded-lg">
              <Phone className="h-4 w-4 text-purple-500" />
            </div>
            <span className="font-medium">+{country.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}