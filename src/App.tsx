import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import CurrentWeatherCard from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LocationInfo from './components/LocationInfo';
import HistoricalData from './components/HistoricalData';
import MarineData from './components/MarineData';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import { useWeather, useLocalStorage } from './hooks/useWeather';
import type { WeatherType } from './types';

function App() {
  const [activeType, setActiveType] = useState<WeatherType>('current');
  const [unit, setUnit] = useLocalStorage<'C' | 'F'>('weatherUnit', 'C');
  const [lastLocation, setLastLocation] = useLocalStorage<string>('lastLocation', 'London');
  
  const { data, loading, error, fetchWeather } = useWeather();

  // Fetch weather on mount and when location changes
  useEffect(() => {
    fetchWeather(lastLocation, { unit });
  }, [lastLocation, unit, fetchWeather]);

  const handleSearch = (location: string) => {
    setLastLocation(location);
  };

  const handleRetry = () => {
    fetchWeather(lastLocation, { unit });
  };

  const handleTypeChange = (type: WeatherType) => {
    setActiveType(type);
  };

  const handleUnitChange = (newUnit: 'C' | 'F') => {
    setUnit(newUnit);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Search Section */}
          <div className="space-y-4">
            <SearchBar 
              onSearch={handleSearch}
              isLoading={loading}
              placeholder="Search city, region, or coordinates..."
            />
          </div>

          {/* Filter Bar */}
          <FilterBar 
            activeType={activeType}
            onTypeChange={handleTypeChange}
            unit={unit}
            onUnitChange={handleUnitChange}
          />

          {/* Content Area */}
          <div className="space-y-6">
            {loading && (
              <LoadingSpinner text={`Fetching ${activeType} weather data...`} />
            )}

            {error && !loading && (
              <ErrorDisplay 
                title="Weather Data Error"
                message={error.message}
                onRetry={handleRetry}
              />
            )}

            {data && !loading && (
              <>
                {/* Current Weather */}
                {activeType === 'current' && (
                  <CurrentWeatherCard 
                    current={data.current}
                    location={data.location}
                    unit={unit}
                  />
                )}

                {/* Forecast */}
                {activeType === 'forecast' && (
                  <Forecast 
                    forecast={data.forecast}
                    unit={unit}
                    location={data.location.name}
                  />
                )}

                {/* Historical */}
                {activeType === 'historical' && (
                  <HistoricalData location={data.location.name} />
                )}

                {/* Marine */}
                {activeType === 'marine' && (
                  <MarineData location={data.location.name} />
                )}

                {/* Location */}
                {activeType === 'location' && (
                  <LocationInfo location={data.location} />
                )}
              </>
            )}

            {/* Initial state - show current weather by default */}
            {data && !loading && activeType === 'current' && data.forecast && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Forecast 
                    forecast={data.forecast}
                    unit={unit}
                    location={data.location.name}
                  />
                  <LocationInfo location={data.location} />
                </div>
              </div>
            )}
          </div>

          {/* Empty State */}
          {!data && !loading && !error && (
            <div className="flex items-center justify-center min-h-96">
              <div className="w-full max-w-2xl">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
                  <div className="relative text-center backdrop-blur-xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-16 shadow-2xl space-y-6">
                    <p className="text-slate-400 text-lg">Search for a location to see weather data</p>
                    <SearchBar 
                      onSearch={handleSearch}
                      placeholder="Try 'New York', 'Tokyo', or 'Sydney'..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
