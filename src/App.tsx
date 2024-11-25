import React, { useState, useEffect, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './graphql/queries';
import { getWeather } from './services/weatherService';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { CountryCard } from './components/CountryCard';
import { CountryModal } from './components/CountryModal';
import type { Country, CountryFilters, Weather } from './types';
import { Globe2 } from 'lucide-react';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

function CountriesExplorer() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<CountryFilters>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | undefined>();

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    async function fetchWeather() {
      if (selectedCountry?.capital) {
        try {
          const weatherData = await getWeather(selectedCountry.capital);
          setWeather(weatherData);
        } catch (error) {
          console.error('Failed to fetch weather:', error);
          setWeather(undefined);
        }
      }
    }

    if (selectedCountry) {
      fetchWeather();
    }
  }, [selectedCountry]);

  const filteredCountries = useMemo(() => {
    if (!data?.countries) return [];

    let result = [...data.countries] as Country[];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(country =>
        country.name.toLowerCase().includes(searchLower) ||
        country.capital?.toLowerCase().includes(searchLower)
      );
    }

    // Apply continent filter
    if (filters.continent) {
      result = result.filter(country => country.continent.name === filters.continent);
    }

    // Apply language filter
    if (filters.language) {
      result = result.filter(country =>
        country.languages.some(lang => lang.name === filters.language)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'capital':
            comparison = (a.capital || '').localeCompare(b.capital || '');
            break;
        }
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [data, search, filters]);

  const continents = useMemo(() => {
    if (!data?.countries) return [];
    return Array.from(new Set(data.countries.map((c: Country) => c.continent.name))).sort();
  }, [data]);

  const languages = useMemo(() => {
    if (!data?.countries) return [];
    const langSet = new Set<string>();
    data.countries.forEach((country: Country) => {
      country.languages.forEach(lang => langSet.add(lang.name));
    });
    return Array.from(langSet).sort();
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading countries: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Countries Explorer</h1>
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          continents={continents}
          languages={languages}
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.code}
              country={country}
              onClick={() => setSelectedCountry(country)}
            />
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No countries found matching your criteria.</p>
          </div>
        )}
      </main>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          weather={weather}
          onClose={() => {
            setSelectedCountry(null);
            setWeather(undefined);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CountriesExplorer />
    </ApolloProvider>
  );
}