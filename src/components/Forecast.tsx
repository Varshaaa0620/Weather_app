import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import type { ForecastDay } from '../types';
import { formatTemperature, formatDate } from '../utils/weather';

interface ForecastProps {
  forecast: Record<string, ForecastDay> | undefined;
  unit: 'C' | 'F';
  location: string;
}

const Forecast: React.FC<ForecastProps> = ({ forecast, unit }) => {
  if (!forecast || Object.keys(forecast).length === 0) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl">
          <p className="text-slate-400 text-center py-8">
            Forecast data requires a paid WeatherStack plan
          </p>
        </div>
      </div>
    );
  }

  const forecastDays = Object.entries(forecast).slice(0, 7);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl hover:border-glass-400 transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-100 mb-6">7-Day Forecast</h3>

        {forecastDays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {forecastDays.map(([date, day]) => (
              <div
                key={date}
                className="backdrop-blur-sm bg-glass-100 border border-glass-200 rounded-2xl p-4 hover:border-glass-300 hover:bg-glass-200 transition-all duration-300"
              >
                <p className="text-xs text-slate-400 mb-3 font-semibold">
                  {formatDate(date)}
                </p>

                {/* Temperature Range */}
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Temperature</p>
                  <div className="flex gap-2">
                    <span className="text-lg font-bold text-cyan-300">
                      {formatTemperature(day.day_max_temp, unit)}
                    </span>
                    <span className="text-lg font-bold text-slate-500">
                      {formatTemperature(day.day_min_temp, unit)}
                    </span>
                  </div>
                </div>

                {/* Avg Temp */}
                <div className="mb-3">
                  <p className="text-xs text-slate-500">Avg: {formatTemperature(day.day_avg_temp, unit)}</p>
                </div>

                {/* Weather Conditions */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-3 h-3 text-cyan-300" />
                    <span className="text-slate-400">{day.day_chance_of_rain}% rain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-3 h-3 text-slate-300" />
                    <span className="text-slate-400">{day.day_chance_of_cloudy}% cloudy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-3 h-3 text-blue-300" />
                    <span className="text-slate-400">{Math.round(day.day_max_wind)} km/h</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="mt-3 pt-3 border-t border-glass-300">
                  <p className="text-xs text-slate-400">
                    Humidity: <span className="text-slate-300 font-medium">{day.day_avg_humidity}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No forecast data available</p>
        )}
      </div>
    </div>
  );
};

export default Forecast;
