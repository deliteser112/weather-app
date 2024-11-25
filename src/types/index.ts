export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  emoji: string;
  languages: Language[];
  states: State[];
  currency: string;
  phone: string;
}

export interface Language {
  name: string;
  code: string;
}

export interface State {
  name: string;
}

export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface CountryFilters {
  continent?: string;
  language?: string;
  sortBy?: 'name' | 'capital';
  sortOrder?: 'asc' | 'desc';
}