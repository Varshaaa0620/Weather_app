import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { WeatherResponse, FilterOptions } from '../types';

class WeatherStackAPI {
  private api: AxiosInstance;
  private apiKey = '9ed0bf38478d37814f2c795673be25fd';
  private baseURL = 'http://api.weatherstack.com';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  /**
   * Get current weather for a location
   */
  async getCurrentWeather(query: string, options?: Partial<FilterOptions>): Promise<WeatherResponse> {
    try {
      const params = {
        access_key: this.apiKey,
        query,
        units: options?.unit === 'F' ? 'f' : 'm',
      };

      console.log('Fetching weather for:', query, 'with params:', params);
      const response = await this.api.get('/current', { params });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get forecast weather data (requires paid plan)
   */
  async getForecast(
    query: string,
    days: number = 7,
    options?: Partial<FilterOptions>
  ): Promise<WeatherResponse> {
    try {
      const params = {
        access_key: this.apiKey,
        query,
        forecast_days: Math.min(days, 14),
        units: options?.unit === 'F' ? 'f' : 'm',
      };

      const response = await this.api.get('/forecast', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get historical weather data (requires paid plan)
   */
  async getHistorical(
    query: string,
    startDate: string,
    endDate: string,
    options?: Partial<FilterOptions>
  ): Promise<WeatherResponse> {
    try {
      const params = {
        access_key: this.apiKey,
        query,
        historical_data: 1,
        start_date: startDate,
        end_date: endDate,
        units: options?.unit === 'F' ? 'f' : 'm',
      };

      const response = await this.api.get('/historical', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get marine data (requires paid plan)
   */
  async getMarine(query: string, options?: Partial<FilterOptions>): Promise<WeatherResponse> {
    try {
      const params = {
        access_key: this.apiKey,
        query,
        units: options?.unit === 'F' ? 'f' : 'm',
      };

      const response = await this.api.get('/marine', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search for locations or get current weather at coordinates
   */
  async searchLocations(
    query: string,
    options?: Partial<FilterOptions>
  ): Promise<WeatherResponse> {
    try {
      const params = {
        access_key: this.apiKey,
        query,
        units: options?.unit === 'F' ? 'f' : 'm',
      };

      const response = await this.api.get('/current', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Convert temperature between Celsius and Fahrenheit
   */
  convertTemperature(temperature: number, fromUnit: 'C' | 'F', toUnit: 'C' | 'F'): number {
    if (fromUnit === toUnit) return temperature;
    if (fromUnit === 'C' && toUnit === 'F') {
      return (temperature * 9) / 5 + 32;
    }
    return ((temperature - 32) * 5) / 9;
  }

  /**
   * Check if API response is successful
   */
  isSuccess(response: WeatherResponse): boolean {
    return !response.error && !!response.current && !!response.location;
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error) {
        return new Error(
          `Weather API Error: ${error.response.data.error.info || error.response.data.error.type}`
        );
      }
      return new Error(`API Error: ${error.message}`);
    }
    return new Error('An unknown error occurred');
  }
}

export default new WeatherStackAPI();
