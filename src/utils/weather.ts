import type { WeatherType } from '../types';

export const getWeatherIcon = (weatherCode: number, isDay: string | boolean): string => {
  // Weather codes mapping
  const iconMap: Record<number, { day: string; night: string }> = {
    0: { day: '☀️', night: '🌙' },
    1: { day: '⛅', night: '🌙' },
    2: { day: '⛅', night: '☁️' },
    3: { day: '☁️', night: '☁️' },
    45: { day: '🌫️', night: '🌫️' },
    48: { day: '🌫️', night: '🌫️' },
    51: { day: '🌧️', night: '🌧️' },
    53: { day: '🌧️', night: '🌧️' },
    55: { day: '🌧️', night: '🌧️' },
    61: { day: '🌧️', night: '🌧️' },
    63: { day: '⛈️', night: '⛈️' },
    65: { day: '⛈️', night: '⛈️' },
    71: { day: '❄️', night: '❄️' },
    73: { day: '❄️', night: '❄️' },
    75: { day: '❄️', night: '❄️' },
    77: { day: '❄️', night: '❄️' },
    80: { day: '🌧️', night: '🌧️' },
    81: { day: '⛈️', night: '⛈️' },
    82: { day: '⛈️', night: '⛈️' },
    85: { day: '❄️', night: '❄️' },
    86: { day: '❄️', night: '❄️' },
    95: { day: '⛈️', night: '⛈️' },
    96: { day: '⛈️', night: '⛈️' },
    99: { day: '⛈️', night: '⛈️' },
  };

  const isDay_ = isDay === 'yes' || isDay === true;
  const icon = iconMap[weatherCode] || { day: '☀️', night: '🌙' };
  return isDay_ ? icon.day : icon.night;
};

export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'C'): string => {
  return `${Math.round(temp)}°${unit}`;
};

export const formatTime = (time: string): string => {
  try {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return time;
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatLongDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getWindDirection = (degree: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degree % 360) / 22.5);
  return directions[index % 16];
};

export const getAirQuality = (humidity: number, _temperature: number, pressure: number): string => {
  // Simple air quality estimation based on available parameters
  let score = 0;

  if (humidity < 30) score += 2;
  else if (humidity < 50) score += 1;
  else if (humidity < 70) score += 0;
  else score += 2;

  if (pressure < 980) score += 2;
  else if (pressure < 1000) score += 1;
  else if (pressure < 1030) score += 0;
  else score += 1;

  if (score <= 2) return 'Excellent';
  if (score <= 4) return 'Good';
  if (score <= 6) return 'Moderate';
  if (score <= 8) return 'Poor';
  return 'Very Poor';
};

export const getWeatherSuggestion = (temp: number, humidity: number, windSpeed: number): string => {
  if (windSpeed > 20) return '⚠️ High winds - Stay indoors or use caution outdoors';
  if (humidity > 80) return '💧 High humidity - Stay hydrated';
  if (temp < 0) return '❄️ Freezing temperatures - Dress warmly';
  if (temp > 35) return '🔥 High temperature - Stay hydrated and avoid direct sun';
  return '✅ Pleasant weather - Enjoy your day!';
};

export const getWeatherTypeLabel = (type: WeatherType): string => {
  const labels: Record<WeatherType, string> = {
    current: 'Current Weather',
    forecast: 'Weather Forecast',
    historical: 'Historical Data',
    marine: 'Marine Data',
    location: 'Location Info',
  };
  return labels[type];
};

export const isValidLocation = (query: string): boolean => {
  return query.trim().length > 0 && query.trim().length <= 100;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
