import React from 'react';
import { MapPin, Globe, Clock } from 'lucide-react';
import type { Location } from '../types';

interface LocationInfoProps {
  location: Location;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location }) => {
  const localTime = new Date(location.localtime_epoch * 1000).toLocaleString();

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative backdrop-blur-2xl bg-dark-glass-300 border border-glass-300 rounded-3xl p-8 shadow-2xl hover:border-glass-400 transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-100 mb-6">Location Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Location Info */}
          <div className="space-y-4">
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-cyan-300" />
                <p className="text-slate-400 text-sm">Location</p>
              </div>
              <p className="text-lg font-bold text-slate-100">{location.name}</p>
              <p className="text-sm text-slate-400 mt-1">
                {location.region}, {location.country}
              </p>
            </div>

            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-blue-300" />
                <p className="text-slate-400 text-sm">Coordinates</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Latitude</p>
                  <p className="text-lg font-bold text-slate-100">{location.lat.toFixed(4)}°</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Longitude</p>
                  <p className="text-lg font-bold text-slate-100">{location.lon.toFixed(4)}°</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time and Timezone Info */}
          <div className="space-y-4">
            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-purple-300" />
                <p className="text-slate-400 text-sm">Local Time</p>
              </div>
              <p className="text-lg font-bold text-slate-100">{localTime}</p>
            </div>

            <div className="backdrop-blur-sm bg-glass-100 rounded-2xl p-4 border border-glass-200">
              <p className="text-slate-400 text-sm mb-2">Timezone</p>
              <p className="text-lg font-bold text-slate-100 mb-2">{location.timezone_id}</p>
              <p className="text-sm text-slate-400">UTC {location.utc_offset}</p>
            </div>
          </div>
        </div>

        {/* Map Link */}
        <div className="mt-6 pt-6 border-t border-glass-300">
          <a
            href={`https://maps.google.com/?q=${location.lat},${location.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 hover:from-cyan-400/50 hover:to-blue-400/50 border border-cyan-300/50 rounded-lg text-cyan-200 transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
