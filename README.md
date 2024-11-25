# Countries Explorer

A modern web application for exploring countries and their weather information, built with React, TypeScript, and GraphQL.

## Features

- Search countries by name
- Filter countries by region
- Sort countries by name, population, or area
- View detailed country information including:
  - Languages spoken
  - Currencies
  - Population
  - Time zones
  - Current weather in the capital city
- Responsive design for all devices
- Real-time weather data integration

## Technologies Used

- React with TypeScript
- Apollo Client for GraphQL
- TailwindCSS for styling
- OpenWeatherMap API for weather data
- Countries GraphQL API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture Decisions

- **Apollo Client**: Chosen for its excellent GraphQL integration, caching capabilities, and type safety.
- **TypeScript**: Ensures type safety and better developer experience.
- **Component Structure**: Modular components for better maintainability and reusability.
- **TailwindCSS**: Provides utility-first CSS for rapid UI development.
- **Error Handling**: Comprehensive error handling for API calls and user inputs.

## Future Improvements

- Add unit tests for components and services
- Implement client-side caching for weather data
- Add more weather details and forecasts
- Implement neighboring countries feature
- Add dark mode support

## API Credits

- Countries data: [Countries GraphQL API](https://countries.trevorblades.com)
- Weather data: [OpenWeatherMap API](https://openweathermap.org/api)