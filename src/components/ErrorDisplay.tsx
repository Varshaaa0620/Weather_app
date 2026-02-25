import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Error',
  message,
  onDismiss,
  onRetry,
}) => {
  return (
    <div className="group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-2xl blur-lg opacity-50 pointer-events-none" />
      <div className="relative backdrop-blur-xl bg-dark-glass-300 border border-rose-300/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-rose-300 mb-2">{title}</h3>
            <p className="text-slate-300 text-sm mb-4">{message}</p>
            <div className="flex items-center gap-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 hover:from-cyan-400/50 hover:to-blue-400/50 border border-cyan-300/50 rounded-lg text-cyan-200 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="flex items-center gap-2 px-4 py-2 bg-glass-100 hover:bg-glass-200 border border-glass-300 rounded-lg text-slate-300 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  Dismiss
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
