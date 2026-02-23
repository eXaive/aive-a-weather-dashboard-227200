'use client'

interface ForecastCardProps {
  forecast: {
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  loading: boolean;
}

export default function ForecastCard({ forecast, loading }: ForecastCardProps) {
  const date = new Date(forecast.dt);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
          <div className="h-8 bg-white/20 rounded w-1/2 mx-auto"></div>
          <div className="h-3 bg-white/20 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-center hover:bg-white/20 transition-colors duration-200">
      <div className="space-y-3">
        <div>
          <p className="text-white font-semibold">{dayName}</p>
          <p className="text-white/70 text-sm">{dayDate}</p>
        </div>
        
        <div className="py-2">
          <p className="text-2xl font-bold text-white">
            {forecast.main.temp}°C
          </p>
        </div>
        
        <div>
          <p className="text-white/80 text-sm capitalize">
            {forecast.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}