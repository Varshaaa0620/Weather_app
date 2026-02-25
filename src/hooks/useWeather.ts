import { useState, useCallback, useEffect } from 'react';
import weatherStackAPI from '../services/weatherstack';
import type { WeatherResponse, FilterOptions } from '../types';

interface UseWeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: Error | null;
}

export const useWeather = () => {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async (query: string, options?: Partial<FilterOptions>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await weatherStackAPI.getCurrentWeather(query, options);
      console.log('fetchWeather response:', response);
      console.log('isSuccess check:', weatherStackAPI.isSuccess(response));
      if (weatherStackAPI.isSuccess(response)) {
        setState({ data: response, loading: false, error: null });
        return response;
      } else {
        const errorMessage = response.error?.info || 'Failed to fetch weather';
        console.error('API returned error response:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      console.error('fetchWeather error:', error.message);
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, []);

  const fetchForecast = useCallback(
    async (query: string, days?: number, options?: Partial<FilterOptions>) => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await weatherStackAPI.getForecast(query, days, options);
        if (weatherStackAPI.isSuccess(response)) {
          setState({ data: response, loading: false, error: null });
          return response;
        } else {
          throw new Error(response.error?.info || 'Failed to fetch forecast');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    []
  );

  const fetchHistorical = useCallback(
    async (
      query: string,
      startDate: string,
      endDate: string,
      options?: Partial<FilterOptions>
    ) => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await weatherStackAPI.getHistorical(
          query,
          startDate,
          endDate,
          options
        );
        if (weatherStackAPI.isSuccess(response)) {
          setState({ data: response, loading: false, error: null });
          return response;
        } else {
          throw new Error(response.error?.info || 'Failed to fetch historical data');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    []
  );

  const fetchMarine = useCallback(async (query: string, options?: Partial<FilterOptions>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await weatherStackAPI.getMarine(query, options);
      if (weatherStackAPI.isSuccess(response)) {
        setState({ data: response, loading: false, error: null });
        return response;
      } else {
        throw new Error(response.error?.info || 'Failed to fetch marine data');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, []);

  return {
    ...state,
    fetchWeather,
    fetchForecast,
    fetchHistorical,
    fetchMarine,
  };
};

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
