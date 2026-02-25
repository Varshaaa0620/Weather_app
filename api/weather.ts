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

    if (error?.response) {
      // Forward upstream status and body when available
      const status = error.response.status || 502;
      const data = error.response.data || { error: error.message };
      return res.status(status).json(data);
    }

    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}
