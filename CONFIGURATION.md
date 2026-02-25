# Environment Configuration Template

This file documents the current API configuration.
For production, consider moving sensitive data to environment variables.

## Current Configuration

### WeatherStack API
- **Base URL**: https://api.weatherstack.com
- **API Key**: 9ed0bf38478d37814f2c795673be25fd
- **Endpoints**:
  - Current: /current
  - Forecast: /forecast
  - Historical: /historical
  - Marine: /marine

### Application Settings
- **Development Port**: 5173
- **Production Build Output**: dist/
- **Default Unit**: Celsius (°C)
- **Debounce Delay**: 500ms
- **API Timeout**: 10000ms (10 seconds)

## For Production Deployment

### Recommended Security Practices

1. **Backend API Gateway**
   - Don't expose API key in frontend
   - Create backend endpoint that wraps WeatherStack API
   - Backend handles authentication

2. **Environment Variables**
   Create a `.env` file:
   ```
   VITE_API_TIMEOUT=10000
   VITE_DEBOUNCE_DELAY=500
   VITE_API_ENDPOINT=https://your-backend.com/api/weather
   ```

3. **Rate Limiting**
   - Implement on backend
   - Cache responses when possible
   - Use CloudFlare or similar CDN

4. **CORS Configuration**
   - Configure proper CORS headers
   - Allow only trusted domains
   - Use credentials carefully

## Development vs Production

### Development
- Direct API calls from frontend
- Hot reload enabled
- Full error logging in console
- Longer timeouts (10s)

### Production
- Backend intermediary recommended
- Minified and optimized build
- Error logging to service (Sentry, etc.)
- Shorter timeouts (5s)
- Caching on CDN
- Compression enabled

## API Rate Limits

Based on WeatherStack subscription:
- **Free Tier**: 250 requests/month
- **Pro Plan**: 100,000 requests/month
- **Unlimited**: Unlimited requests

Current setup uses Free tier by default.

## Data Storage

### Browser LocalStorage
- `weatherUnit`: User's temperature preference
- `lastLocation`: Last searched location

### Server-Side (Optional)
- User search history
- Favorite locations
- User preferences
- Usage analytics

## Monitoring & Analytics

Consider integrating:
- Google Analytics for user behavior
- Sentry for error tracking
- Datadog for performance monitoring
- CloudFlare for analytics

## Notes for Developers

1. **API Key Security**: Keep API key in backend only for production
2. **Credit Limits**: Track API usage to avoid overage charges
3. **Cache Strategy**: Implement caching for frequently requested locations
4. **Fallback Data**: Have cached data for common cities as fallback
5. **Error Handling**: Always provide user-friendly error messages

## Useful Links

- WeatherStack Dashboard: https://weatherstack.com/dashboard
- API Documentation: https://docs.apilayer.com/weatherstack
- Pricing & Plans: https://weatherstack.com/product/plans

---

Last Updated: February 2026
