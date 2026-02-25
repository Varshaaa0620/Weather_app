import React from 'react';
import {
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sun,
  AlertCircle,
} from 'lucide-react';
import type { CurrentWeather, Location } from '../types';
import {
  formatTemperature,
  formatTime,
  getWindDirection,
  getAirQuality,
  getWeatherSuggestion,
  formatDate,
} from '../utils/weather';

interface CurrentWeatherProps {
  current: CurrentWeather;
  location: Location;
  unit: 'C' | 'F';
}

const CurrentWeatherCard: React.FC<CurrentWeatherProps> = ({ current, location, unit }) => {
  const feelsLike = formatTemperature(current.feelslike, unit);
  const temp = formatTemperature(current.temperature, unit);
  const windDir = getWindDirection(current.wind_degree);
  const airQuality = getAirQuality(current.humidity, current.temperature, current.pressure);
  const suggestion = getWeatherSuggestion(current.temperature, current.humidity, current.wind_speed);

  return (
    <div className="w-full space-y-6">
      {/* Main weather card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl hover:border-glass-400 transition-all duration-300">
          {/* Location Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-glass-300">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">{location.name}</h2>
              <p className="text-slate-400 text-sm mt-1">
                {location.region}, {location.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">{formatDate(new Date().toISOString())}</p>
              <p className="text-slate-400 text-sm mt-1">{formatTime(current.observation_time)}</p>
            </div>
          </div>

          {/* Temperature Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Temperature</p>
                  <p className="text-6xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {temp}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Feels like {feelsLike}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Description */}
            <div className="flex flex-col justify-center">
              <div className="text-5xl mb-4">
                {current.weather_descriptions[0]}
              </div>
              <p className="text-slate-300 text-lg">{current.weather_descriptions[0]}</p>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Humidity */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-cyan-300" />
                <p className="text-slate-400 text-xs">Humidity</p>
              </div>
              <p className="text-2xl font-bold text-cyan-300">{current.humidity}%</p>
            </div>

            {/* Wind Speed */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-blue-300" />
                <p className="text-slate-400 text-xs">Wind</p>
              </div>
              <p className="text-2xl font-bold text-blue-300">
                {Math.round(current.wind_speed)} km/h
              </p>
              <p className="text-xs text-slate-500 mt-1">{windDir}</p>
            </div>

            {/* Pressure */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-emerald-300" />
                <p className="text-slate-400 text-xs">Pressure</p>
              </div>
              <p className="text-2xl font-bold text-emerald-300">{current.pressure} mb</p>
            </div>

            {/* Visibility */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-purple-300" />
                <p className="text-slate-400 text-xs">Visibility</p>
              </div>
              <p className="text-2xl font-bold text-purple-300">{current.visibility} km</p>
            </div>

            {/* Cloud Cover */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-4 h-4 text-slate-300" />
                <p className="text-slate-400 text-xs">Cloud Cover</p>
              </div>
              <p className="text-2xl font-bold text-slate-300">{current.cloudcover}%</p>
            </div>

            {/* Precipitation */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="w-4 h-4 text-indigo-300" />
                <p className="text-slate-400 text-xs">Precipitation</p>
              </div>
              <p className="text-2xl font-bold text-indigo-300">{current.precip} mm</p>
            </div>

            {/* UV Index */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-orange-300" />
                <p className="text-slate-400 text-xs">UV Index</p>
              </div>
              <p className="text-2xl font-bold text-orange-300">{current.uv_index}</p>
            </div>

            {/* Air Quality */}
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200 hover:border-glass-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-300" />
                <p className="text-slate-400 text-xs">Air Quality</p>
              </div>
              <p className="text-2xl font-bold text-rose-300">{airQuality}</p>
            </div>
          </div>

          {/* Suggestion */}
          <div className="backdrop-blur-sm bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-glass-200 rounded-2xl p-4">
            <p className="text-slate-100">{suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
