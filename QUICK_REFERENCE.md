# WeatherInsight - Quick Reference & Cheat Sheet

## 🚀 Quick Start (30 seconds)

```bash
# 1. App is already running at http://localhost:5173/
# 2. Search for a city (e.g., "New York")
# 3. Explore features using the filter bar
# 4. Toggle temperature units (°C / °F)
```

## 📲 Key Features At a Glance

| Feature | How to Use | Location |
|---------|-----------|----------|
| **Search** | Type city name | Top of page |
| **Filter** | Click data type | Below search bar |
| **Forecast** | Click "Forecast" tab | Filter bar |
| **Location Info** | Click "Location" tab | Filter bar |
| **Temperature** | Toggle °C / °F | Top right of filter |
| **Google Maps** | Click link in Location | Location info card |

## 🎨 What You're Looking At

```
┌─────────────────────────────────────┐
│  HEADER - Logo & Branding           │
├─────────────────────────────────────┤
│  SEARCH BAR - Find any location     │
├─────────────────────────────────────┤
│  FILTER BAR - Toggle data & units   │
├─────────────────────────────────────┤
│  MAIN CONTENT AREA                  │
│  ┌─────────────────────────────────┐│
│  │ Current Weather Card            ││
│  │ - Temperature                   ││
│  │ - Humidity, Wind, Pressure      ││
│  │ - Air Quality, UV Index         ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ 7-Day Forecast Cards (horiz)    ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ Location Information             ││
│  │ - Coordinates, Timezone          ││
│  │ - Local Time, Maps Link          ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  FOOTER - Links & Info              │
└─────────────────────────────────────┘
```

## 💻 Example Searches

```
Try these to explore:

📍 Cities:
   London, New York, Tokyo, Paris
   Sydney, Dubai, Singapore, Berlin

🏔️ Regions:
   California, Tuscany, Bali, Colorado
   Provence, Santorini, Iceland

🌍 Coordinates:
   40.7128,-74.0060 (New York)
   51.5074,-0.1278 (London)
   35.6762,139.6503 (Tokyo)
```

## 🎯 Data Displayed

### Current Weather
```
Temperature          → Large, color-coded display
Feels Like          → What it actually feels like
Humidity            → % moisture in air
Wind Speed          → km/h + direction (N, S, E, W, etc.)
Pressure            → Atmospheric pressure (mb)
Visibility          → How far you can see (km)
Cloud Cover         → % cloud coverage
Precipitation       → Amount of rain (mm)
UV Index            → Sun exposure risk
Air Quality         → Calculated estimate
Personal Suggestion → What you should do
```

### Forecast (Premium)
```
For each day:
- Min/Max Temperature
- Weather Conditions
- Chance of Rain/Snow
- Cloud Coverage
- Wind Speed
- Humidity Level
```

### Location Info
```
City & Country      → Where you are
Coordinates         → Latitude & Longitude
Timezone            → Local timezone (IANA)
Local Time          → Current local time
Google Maps Link    → View on interactive map
```

## 🔧 How It Works Behind the Scenes

```
1. You type "London"
                ↓
2. Search app debounces (waits 500ms)
                ↓
3. App sends API request to WeatherStack
                ↓
4. WeatherStack returns weather data
                ↓
5. App displays data in components
                ↓
6. Data saved to browser memory
```

## 🌡️ Temperature Conversions

```
°C to °F:  (°C × 9/5) + 32
°F to °C:  (°F - 32) × 5/9

Examples:
20°C  = 68°F
0°C   = 32°F
30°C  = 86°F
```

## 🎨 Design Patterns Used

```
Glassmorphic Cards:
- Frosted glass background
- Semi-transparent white overlay
- Backdrop blur effect
- Smooth borders & corners

Gradient Accents:
- Cyan → Blue gradients
- Hover effects
- Smooth transitions (200-300ms)

Color Coding:
- Cyan: Primary information
- Blue: Secondary actions
- Emerald: Good indicators
- Orange: Warnings (UV, Temperature)
- Rose: Errors
```

## 📊 Metrics & Icons

```
💧 Humidity       → Water content in air
💨 Wind Speed     → Air movement (km/h)
🧭 Direction      → N, NE, E, SE, S, SW, W, NW
☁️  Cloud Cover    → % covered by clouds
👁️  Visibility     → Line of sight distance
💨 Pressure       → Atmospheric weight (mb)
☀️  UV Index       → Sun radiation intensity
🌡️  Temperature    → Current heat level
❄️  Feels Like     → Perceived temperature
```

## ⚡ Keyboard Shortcuts

```
While in search: 
  Enter  → Search
  Escape → Close suggestions
  Tab    → Next field

General:
  F12    → Developer tools (debug)
  Ctrl+R → Reload page
```

## 🔄 Data Refresh

```
Automatic:
  - Data loads immediately on search
  - No automatic refresh (search new location)

Manual:
  - Search new location to refresh
  - Change data type
  - Toggle temperature unit
```

## 💾 Data Stored Locally

```
Browser LocalStorage:
  weatherUnit    → Your temperature preference (C/F)
  lastLocation   → Last city you searched
  
Not shared with anyone - stays on your device!
```

## 🌐 API Information

```
Service:    WeatherStack
Status:     Free tier (current weather only)
Response:   Full JSON data
Updates:    Real-time

Premium Features (Require Paid Plan):
  ✗ Forecast (7 days)
  ✗ Historical (past weather)
  ✗ Marine (wave data)
```

## 🚨 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| **No data shows** | Check internet connection |
| **Search doesn't work** | Ensure city name is spelled correctly |
| **Styling looks broken** | Hard refresh: Ctrl+Shift+Del |
| **Page loads slowly** | Wait for API response (10s timeout) |
| **Can't find location** | Try city in different format |

## 📱 Mobile vs Desktop

```
Mobile (< 640px):
  - Full width cards
  - Single column layout
  - Larger touch targets
  - Vertical scrolling

Desktop (> 1024px):
  - Multi-column cards
  - Horizontal layout
  - Hover effects
  - Compact spacing
```

## 🎓 Learning Path

1. **Basic**: Search for your city
2. **Intermediate**: Switch between data types
3. **Advanced**: Try coordinates or region names
4. **Expert**: Open dev tools (F12) & inspect data

## 🔗 External Links

```
API Dashboard:   https://weatherstack.com/dashboard
API Docs:        https://docs.apilayer.com/weatherstack
Source Code:     Check src/ folder
Documentation:   See README.md
```

## 💡 Pro Tips

```
1. Pin favorite cities by remembering them
2. Check forecast for weekend plans
3. Use UV index to plan outdoor activities
4. Wind direction helps predict weather changes
5. Air quality helps with allergies/asthma
6. Coordinates work for precise locations
```

## 🎯 Next Steps

- [ ] Search for your location
- [ ] Toggle temperature unit
- [ ] Check 7-day forecast (if available)
- [ ] Explore location details
- [ ] Bookmark for future use
- [ ] Check on mobile device

## 📖 Full Documentation

For detailed information, see:
- **README.md** - Overview & features
- **SETUP_GUIDE.md** - Installation & usage
- **PROJECT_DOCUMENTATION.md** - Technical details
- **CONFIGURATION.md** - Configuration options

## 🎉 You're All Set!

Start exploring weather data and building with this app!

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

---

*Quick Reference v1.0* | Last Updated: Feb 2026
