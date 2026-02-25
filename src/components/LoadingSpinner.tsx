import React from 'react';
import { Cloud } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading weather data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" />
        <div className="absolute inset-2 bg-dark-glass-300 rounded-full border border-glass-300 flex items-center justify-center animate-spin">
          <Cloud className="w-10 h-10 text-cyan-300" />
        </div>
      </div>
      <p className="text-slate-300 text-lg font-medium animate-pulse">{text}</p>
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
