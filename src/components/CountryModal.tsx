import React from 'react';
import type { Country, Weather } from '../types';
import { X, ThermometerSun, Droplets, Wind, Globe, MapPin, Phone, Building2 } from 'lucide-react';

interface CountryModalProps {
  country: Country;
  weather?: Weather;
  onClose: () => void;
}

export function CountryModal({ country, weather, onClose }: CountryModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <span className="text-6xl animate-bounce-slow">{country.emoji}</span>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                  bg-clip-text text-transparent">{country.name}</h2>
                <p className="text-lg font-medium text-gray-500">{country.continent.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {weather && (
            <div className="mt-8 glass-card rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Weather in {country.capital}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <ThermometerSun className="h-6 w-6 text-blue-500" />
                  <span className="text-lg font-semibold text-blue-900">{weather.temperature}°C</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <span className="text-lg font-semibold text-blue-900">{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                  <Wind className="h-6 w-6 text-blue-500" />
                  <span className="text-lg font-semibold text-blue-900">{weather.windSpeed} m/s</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                <img
                  src={weather.icon}
                  alt={weather.description}
                  className="w-12 h-12"
                />
                <span className="text-lg font-medium text-blue-900 capitalize">{weather.description}</span>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Details</h3>
                <dl className="space-y-3">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <dt className="text-sm font-medium text-gray-500">Capital</dt>
                    <dd className="text-sm font-semibold text-gray-900">{country.capital || 'N/A'}</dd>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <dt className="text-sm font-medium text-gray-500">Phone Code</dt>
                    <dd className="text-sm font-semibold text-gray-900">+{country.phone}</dd>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <dt className="text-sm font-medium text-gray-500">Currency</dt>
                    <dd className="text-sm font-semibold text-gray-900">{country.currency}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {country.languages.map((lang) => (
                    <span key={lang.code} className="badge">
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>

              {country.states.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    States/Provinces
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {country.states.map((state) => (
                      <span key={state.name} className="badge">
                        {state.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}