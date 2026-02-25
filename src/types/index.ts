export interface Location {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  timezone_id: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface CurrentWeather {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day_max_temp: number;
  day_min_temp: number;
  day_avg_temp: number;
  day_total_snow: number;
  day_max_wind: number;
  day_avg_wind: number;
  day_uv_index: number;
  day_chance_of_snow: number;
  day_chance_of_rain: number;
  day_chance_of_windy: number;
  day_chance_of_cloudy: number;
  day_chance_of_humid: number;
  day_chance_of_freezing_rain: number;
  day_chance_of_thunder: number;
  day_chance_of_fog: number;
  day_avg_humidity: number;
  day_avg_visibility: number;
  day_avg_pressure: number;
}

export interface HistoricalWeather {
  date: string;
  date_epoch: number;
  day_max_temp: number;
  day_min_temp: number;
  day_avg_temp: number;
  day_total_snow: number;
  day_max_wind: number;
  day_avg_wind: number;
  day_uv_index: number;
  day_avg_humidity: number;
  day_avg_visibility: number;
  day_avg_pressure: number;
}

export interface MarineData {
  date: string;
  date_epoch: number;
  wave_height: number;
  wave_period: number;
  wave_direction: number;
  swell_height: number;
  swell_period: number;
  swell_direction: number;
  tide_data: Array<{
    tide_time: string;
    tide_type: string;
    tide_height: number;
    tide_time_epoch: number;
  }>;
}

export interface WeatherResponse {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: Location;
  current: CurrentWeather;
  forecast?: Record<string, ForecastDay>;
  historical?: Record<string, HistoricalWeather>;
  marine?: Record<string, MarineData>;
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

export interface SearchResult {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export type WeatherType = 'current' | 'forecast' | 'historical' | 'marine' | 'location';

export interface FilterOptions {
  type: WeatherType;
  unit: 'C' | 'F';
  days?: number;
}
