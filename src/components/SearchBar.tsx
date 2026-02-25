import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader, X } from 'lucide-react';
import { debounce } from '../utils/weather';

interface SearchBarProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestions?: Array<{ name: string; country: string }>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
  placeholder = 'Search location...',
  suggestions = [],
}) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = debounce((value: string) => {
    if (value.trim().length > 0) {
      onSearch(value);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
    if (value.trim().length > 0) {
      debouncedSearch(value);
    }
  };

  const handleClear = () => {
    setInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (input) {
      inputRef.current?.select();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          {/* Search input with glassmorphic design */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl bg-dark-glass-300 border border-glass-300 hover:border-glass-400 transition-all duration-300 shadow-xl">
              <Search className="w-5 h-5 text-cyan-300/70" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-base focus:outline-none"
              />
              {isLoading && (
                <Loader className="w-5 h-5 text-cyan-300/70 animate-spin" />
              )}
              {input && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-dark-glass-400 border border-glass-300 rounded-2xl shadow-2xl overflow-hidden z-50">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                  className="w-full px-5 py-3 flex items-center gap-3 hover:bg-glass-200 transition-colors text-left group"
                >
                  <MapPin className="w-4 h-4 text-cyan-300/50 group-hover:text-cyan-300" />
                  <div className="flex-1">
                    <p className="text-slate-100 font-medium">{suggestion.name}</p>
                    <p className="text-xs text-slate-500">{suggestion.country}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
