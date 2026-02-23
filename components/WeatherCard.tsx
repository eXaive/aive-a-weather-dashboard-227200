'use client'

import { Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';

interface WeatherCardProps {
  weather: {
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
  };
  loading: boolean;
}

export default function WeatherCard({ weather, loading }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-white/20 rounded w-1/2 mx-auto"></div>
          <div className="h-16 bg-white/20 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-white/20 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{weather.name}</h2>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-6xl font-bold text-white">
            {weather.main.temp}°C
          </span>
        </div>
        <p className="text-white/80 text-lg capitalize mt-2">
          {weather.weather[0].description}
        </p>
        <p className="text-white/60 text-sm">
          Feels like {weather.main.feels_like}°C
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Droplets className="w-6 h-6 text-blue-200 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Humidity</p>
          <p className="text-white font-semibold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Wind className="w-6 h-6 text-blue-200 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Wind Speed</p>
          <p className="text-white font-semibold">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Gauge className="w-6 h-6 text-blue-200 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Pressure</p>
          <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Eye className="w-6 h-6 text-blue-200 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Visibility</p>
          <p className="text-white font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>
    </div>
  );
}