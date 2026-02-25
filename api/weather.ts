import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    const {
      endpoint = 'current',
      query = '',
      unit = 'C',
      days,
      startDate,
      endDate,
    } = req.query || {};

    const apiKey = process.env.WEATHERSTACK_KEY || '9ed0bf38478d37814f2c795673be25fd';
    const units = unit === 'F' ? 'f' : 'm';

    const params: any = {
      access_key: apiKey,
      query,
      units,
    };

    if (days) params.forecast_days = days;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const baseURL = `https://api.weatherstack.com`;
    const url = `${baseURL}/${endpoint}`;

    const response = await axios.get(url, { params, timeout: 10000 });

    // Return upstream API response transparently
    res.setHeader('Content-Type', 'application/json');
    return res.status(response.status || 200).json(response.data);
  } catch (error: any) {
    // Log full error for Vercel function logs
    console.error('Proxy error:', error?.response?.status, error?.response?.data || error.message);

    // If WeatherStack signals a usage limit or subscription error, provide a fallback
    const upstreamData = error?.response?.data;
    const isUsageLimit = upstreamData?.error?.info && /usage limit|monthly usage/i.test(upstreamData.error.info);

    if (isUsageLimit) {
      try {
        const { endpoint = 'current', query = '', unit = 'C' } = req.query || {};
        if (endpoint === 'current' && query) {
          const fallback = await fetchOpenMeteoFallback(query, unit as string);
          if (fallback) {
            console.warn('Using Open-Meteo fallback for', query);
            return res.status(200).json(fallback);
          }
        }
      } catch (fallbackErr) {
        console.error('Fallback error:', fallbackErr);
      }
    }

    if (error?.response) {
      // Forward upstream status and body when available
      const status = error.response.status || 502;
      const data = error.response.data || { error: error.message };
      return res.status(status).json(data);
    }

    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}

// --- Fallback: Open-Meteo (no API key required) ---
async function fetchOpenMeteoFallback(query: string, unit: string) {
  try {
    // 1) Geocode the query using Open-Meteo geocoding API
    const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: query, count: 1 },
      timeout: 8000,
    });

    const geo = geoRes.data?.results?.[0];
    if (!geo) return null;

    const lat = geo.latitude;
    const lon = geo.longitude;
    const timezone = geo.timezone || 'UTC';

    // 2) Fetch current weather from Open-Meteo
    const tempUnit = unit === 'F' ? 'fahrenheit' : 'celsius';
    const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        timezone,
        temperature_unit: tempUnit,
      },
      timeout: 8000,
    });

    const cw = weatherRes.data?.current_weather;
    if (!cw) return null;

    // Map Open-Meteo response to WeatherStack-like shape used by the app
    const mapped = {
      request: {
        type: 'City',
        query,
        language: 'en',
        unit: unit === 'F' ? 'F' : 'C',
      },
      location: {
        name: geo.name || query,
        country: geo.country || '',
        region: geo.admin1 || '',
        lat: lat,
        lon: lon,
        timezone_id: timezone,
        localtime_epoch: Math.floor(new Date(cw.time).getTime() / 1000),
        utc_offset: '',
      },
      current: {
        observation_time: new Date(cw.time).toISOString(),
        temperature: Math.round(cw.temperature * 10) / 10,
        weather_code: cw.weathercode ?? 0,
        weather_icons: [],
        weather_descriptions: [mapWeatherCodeToDescription(cw.weathercode)],
        wind_speed: cw.windspeed ?? 0,
        wind_degree: cw.winddirection ?? 0,
        wind_dir: '',
        pressure: 0,
        precip: 0,
        humidity: 0,
        cloudcover: 0,
        feelslike: Math.round(cw.temperature * 10) / 10,
        uv_index: 0,
        visibility: 0,
        is_day: 'yes',
      },
    };

    return mapped;
  } catch (err) {
    console.error('Open-Meteo fallback failed:', err);
    return null;
  }
}

function mapWeatherCodeToDescription(code: number) {
  const map: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
  };
  return map[code] || 'Weather';
}
