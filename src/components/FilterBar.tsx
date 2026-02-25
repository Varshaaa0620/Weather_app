import React from 'react';
import { Cloud, Calendar, Waves, MapPin, TrendingUp } from 'lucide-react';
import type { WeatherType } from '../types';

interface FilterBarProps {
  activeType: WeatherType;
  onTypeChange: (type: WeatherType) => void;
  unit: 'C' | 'F';
  onUnitChange: (unit: 'C' | 'F') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeType, onTypeChange, unit, onUnitChange }) => {
  const weatherTypes: Array<{ type: WeatherType; label: string; icon: React.ReactNode }> = [
    { type: 'current', label: 'Current', icon: <Cloud className="w-4 h-4" /> },
    { type: 'forecast', label: 'Forecast', icon: <TrendingUp className="w-4 h-4" /> },
    { type: 'historical', label: 'Historical', icon: <Calendar className="w-4 h-4" /> },
    { type: 'marine', label: 'Marine', icon: <Waves className="w-4 h-4" /> },
    { type: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full backdrop-blur-xl bg-dark-glass-200 border border-glass-300 rounded-2xl p-4 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Weather Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {weatherTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeType === type
                  ? 'bg-gradient-to-r from-cyan-400/30 to-blue-400/30 border border-cyan-300/50 text-cyan-200 shadow-lg shadow-cyan-500/20'
                  : 'bg-glass-100 border border-glass-200 text-slate-300 hover:bg-glass-200 hover:border-glass-300'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Temperature Unit Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-slate-400 text-sm">Temperature:</span>
          <div className="flex bg-dark-glass-300 border border-glass-300 rounded-xl p-1">
            <button
              onClick={() => onUnitChange('C')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                unit === 'C'
                  ? 'bg-gradient-to-r from-cyan-400/40 to-blue-400/40 text-cyan-200 border border-cyan-300/50'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitChange('F')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                unit === 'F'
                  ? 'bg-gradient-to-r from-cyan-400/40 to-blue-400/40 text-cyan-200 border border-cyan-300/50'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
