import React from 'react';
import { Cloud } from 'lucide-react';

interface HeaderProps {
  onLocationChange?: (location: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-glass-200 border-b border-glass-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/30 to-cyan-400/30 backdrop-blur-sm border border-blue-300/20">
              <Cloud className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                WeatherInsight
              </h1>
              <p className="text-xs text-slate-400">Real-time Weather Intelligence</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-400">Powered by</p>
              <p className="text-sm font-semibold text-cyan-300">WeatherStack API</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
