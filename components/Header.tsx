import { Cloud } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Cloud className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white">
            Weather Dashboard
          </h1>
        </div>
        <p className="text-center text-white/80 mt-2">
          Stay updated with real-time weather information
        </p>
      </div>
    </header>
  );
}