import React from 'react';
import { AlertCircle, Calendar } from 'lucide-react';

interface HistoricalDataProps {
  location: string;
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ location }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl hover:border-glass-400 transition-all duration-300">
        <div className="flex items-center gap-4">
          <Calendar className="w-12 h-12 text-amber-300/40" />
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Historical Weather Data</h3>
            <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-300/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-300" />
              <p className="text-amber-200 text-sm">
                Historical data access requires a WeatherStack paid plan
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              Access historical weather data for {location} with a premium subscription to WeatherStack API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;
