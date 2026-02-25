import React from 'react';
import { AlertCircle, Waves } from 'lucide-react';

interface MarineDataProps {
  location: string;
}

const MarineData: React.FC<MarineDataProps> = ({ location }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl hover:border-glass-400 transition-all duration-300">
        <div className="flex items-center gap-4">
          <Waves className="w-12 h-12 text-blue-300/40" />
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Marine Data</h3>
            <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-300/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-300" />
              <p className="text-blue-200 text-sm">
                Marine data access requires a WeatherStack paid plan
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              Get real-time marine conditions including wave height, swell data, and tidal information for {location} with a premium subscription.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="backdrop-blur-sm bg-glass-100 rounded-xl p-3 border border-glass-200 text-center">
                <p className="text-xs text-slate-500">Wave Height</p>
                <p className="text-sm text-slate-300 mt-1">Premium</p>
              </div>
              <div className="backdrop-blur-sm bg-glass-100 rounded-xl p-3 border border-glass-200 text-center">
                <p className="text-xs text-slate-500">Swell Direction</p>
                <p className="text-sm text-slate-300 mt-1">Premium</p>
              </div>
              <div className="backdrop-blur-sm bg-glass-100 rounded-xl p-3 border border-glass-200 text-center">
                <p className="text-xs text-slate-500">Tidal Data</p>
                <p className="text-sm text-slate-300 mt-1">Premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineData;
