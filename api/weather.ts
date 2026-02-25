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

    // Return API response transparently
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data);
  } catch (error: any) {
    const message = error?.response?.data || error.message || 'Unknown error';
    res.status(500).json({ error: message });
  }
}
