import React from 'react';
import { Monitor, Smartphone, Wrench, Video } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-black text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Tech Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Expert Tech Support at Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Connect with verified tech experts for remote assistance or find trusted repair shops near you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Get Remote Help
            </button>
            <button className="bg-accent-blue-dark hover:bg-accent-blue-light text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Find Repair Shops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}