# WeatherInsight - Real-time Weather Intelligence

A modern, feature-rich weather application built with React, TypeScript, and Tailwind CSS. Powered by the WeatherStack API, WeatherInsight provides real-time weather data with an intuitive glassmorphic design.

![Built with React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4+-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.3+-blue?style=flat-square&logo=vite)

## 🎯 Features

### Core Features
- **Current Weather**: Real-time weather data including temperature, humidity, wind speed, pressure, visibility, and more
- **7-Day Forecast**: Weather predictions for the next 7 days (requires paid plan)
- **Historical Data**: Access to historical weather records (requires paid plan)
- **Marine Data**: Wave height, swell direction, and tidal information (requires paid plan)
- **Location Information**: Detailed location data including coordinates, timezone, and local time

### User Experience
- **Advanced Search**: Intelligent location search with debouncing
- **Filter System**: Switch between different weather data types
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Persistent Storage**: Remembers preferences and last location
- **Glassmorphic Design**: Modern UI with frosted glass effect
- **Responsive Layout**: Fully responsive for all devices

### Visual Indicators
- Weather icons and descriptions
- Air quality assessment
- UV index tracking
- Wind direction with cardinal indicators
- Comprehensive weather metrics

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 4 with PostCSS
- **Build Tool**: Vite 7.3
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: WeatherStack

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Navigate to the project directory:
```bash
cd Weather_app
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/              # React UI components
├── services/               # API service layer
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript interfaces
├── utils/                  # Helper functions
├── App.tsx                # Main app component
└── main.tsx               # Entry point

public/                    # Static assets
dist/                      # Production build
```

## 🌐 API Integration

**API**: [WeatherStack](https://weatherstack.com)
**API Key**: `9ed0bf38478d37814f2c795673be25fd`
**Documentation**: [WeatherStack API Docs](https://docs.apilayer.com/weatherstack/docs/api-documentation)

### Endpoints
- `/current` - Real-time weather
- `/forecast` - 7-day forecast (paid)
- `/historical` - Historical data (paid)
- `/marine` - Marine conditions (paid)

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design Features

### Glassmorphic Design
- Frosted glass effect with backdrop blur
- Layered transparency and gradients
- Smooth hover transitions
- Modern color palette (Cyan to Blue)
- Animated backgrounds

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 💡 Key Components

- **SearchBar**: Location search with debouncing
- **FilterBar**: Weather type and unit selection
- **CurrentWeatherCard**: Main weather display
- **Forecast**: 7-day predictions
- **LocationInfo**: Geographic details
- **ErrorDisplay**: Error handling UI
- **LoadingSpinner**: Loading states

## ⚡ Performance

- Bundle Size: ~267KB (minified), ~84KB (gzipped)
- First Contentful Paint: <1s
- Optimized with Vite and Tailwind CSS

## 🔍 Troubleshooting

### Build Issues
```bash
rm -r node_modules dist
npm install
npm run build
```

### API Problems
- Verify API key validity
- Check internet connection
- Ensure valid location query
- Verify WeatherStack subscription

## 📝 Notes

- Forecast, Historical, and Marine features require WeatherStack premium plan
- Free tier includes current weather and location data only
- Search results update with 500ms debounce
- Preferences stored in browser LocalStorage

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

## 📄 License

Open source under MIT License

## ❤️ Built With

- React & TypeScript
- Tailwind CSS for styling
- Vite for fast development
- WeatherStack API for data
- Lucide React for icons

---

**Start exploring weather data today!**
