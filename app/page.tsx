'use client'

import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import SearchForm from '../components/SearchForm'
import ForecastCard from '../components/ForecastCard'
import { useState, useEffect } from 'react'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load default city weather on component mount
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with real OpenWeatherMap API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock weather data
      const mockWeatherData: WeatherData = {
        name: city,
        main: {
          temp: Math.round(Math.random() * 30 + 5),
          feels_like: Math.round(Math.random() * 30 + 5),
          humidity: Math.round(Math.random() * 100),
          pressure: Math.round(Math.random() * 100 + 1000),
        },
        weather: [{
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }],
        wind: {
          speed: Math.round(Math.random() * 20)
        },
        visibility: Math.round(Math.random() * 10000)
      };

      const mockForecastData: ForecastData = {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt: Date.now() + (i * 24 * 60 * 60 * 1000),
          main: {
            temp: Math.round(Math.random() * 30 + 5)
          },
          weather: [{
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }]
        }))
      };

      setCurrentWeather(mockWeatherData);
      setForecast(mockForecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Section */}
          <div className="flex justify-center">
            <SearchForm onSearch={fetchWeatherData} loading={loading} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Current Weather */}
          {currentWeather && (
            <div className="animate-fade-in">
              <WeatherCard weather={currentWeather} loading={loading} />
            </div>
          )}

          {/* 5-Day Forecast */}
          {forecast && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {forecast.list.map((day, index) => (
                  <ForecastCard
                    key={index}
                    forecast={day}
                    loading={loading}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}