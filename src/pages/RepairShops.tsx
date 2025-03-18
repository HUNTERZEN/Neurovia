import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Star, Clock, PenTool as Tools, Shield, Search, Filter } from 'lucide-react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const shops = [
  {
    id: 1,
    name: 'TechFix Pro',
    rating: 4.8,
    reviews: 156,
    address: '123 Tech Street, Silicon Valley',
    coordinates: [-122.4194, 37.7749],
    services: ['Laptop Repair', 'Phone Repair', 'Data Recovery'],
    hours: '9:00 AM - 6:00 PM',
    warranty: '90-Day',
    startingPrice: 49
  },
  {
    id: 2,
    name: 'Digital Doctors',
    rating: 4.9,
    reviews: 203,
    address: '456 Innovation Ave, Silicon Valley',
    coordinates: [-122.4124, 37.7829],
    services: ['Computer Repair', 'Gaming Console Repair'],
    hours: '8:00 AM - 7:00 PM',
    warranty: '60-Day',
    startingPrice: 39
  },
  {
    id: 3,
    name: 'Quick Tech Solutions',
    rating: 4.7,
    reviews: 128,
    address: '789 Circuit Lane, Silicon Valley',
    coordinates: [-122.4264, 37.7679],
    services: ['Phone Repair', 'Tablet Repair', 'Screen Replacement'],
    hours: '10:00 AM - 8:00 PM',
    warranty: '120-Day',
    startingPrice: 45
  }
];

export function RepairShops() {
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [viewport, setViewport] = useState({
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Repair Shops Near You</h1>
        <p className="text-xl text-gray-400">Verified repair shops for all your hardware needs</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location or service..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="">All Services</option>
              <option value="laptop">Laptop Repair</option>
              <option value="phone">Phone Repair</option>
              <option value="tablet">Tablet Repair</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="h-[600px] bg-gray-800 rounded-xl overflow-hidden">
          <Map
            mapLib={import('maplibre-gl')}
            {...viewport}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
            onMove={evt => setViewport(evt.viewState)}
          >
            {shops.map((shop) => (
              <Marker
                key={shop.id}
                longitude={shop.coordinates[0]}
                latitude={shop.coordinates[1]}
                onClick={() => setSelectedShop(shop.id)}
              >
                <div className={`
                  p-2 rounded-full cursor-pointer transition-all
                  ${selectedShop === shop.id ? 'bg-primary text-white scale-125' : 'bg-white text-primary'}
                `}>
                  <MapPin className="w-4 h-4" />
                </div>
              </Marker>
            ))}
            <NavigationControl position="top-right" />
          </Map>
        </div>

        {/* Shop List */}
        <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className={`
                bg-gray-800 rounded-xl p-6 cursor-pointer transition-all
                ${selectedShop === shop.id ? 'ring-2 ring-primary' : 'hover:bg-gray-700'}
              `}
              onClick={() => setSelectedShop(shop.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">{shop.rating}</span>
                    <span className="text-gray-400 ml-1">({shop.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{shop.address}</span>
                  </div>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Open Now
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{shop.hours}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Tools className="w-4 h-4 mr-2" />
                  <span>{shop.services[0]}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>{shop.warranty} Warranty</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Star className="w-4 h-4 mr-2" />
                  <span>{shop.rating}/5 Rating</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div>
                  <span className="text-sm text-gray-400">Starting from</span>
                  <p className="text-xl font-semibold text-primary-light">${shop.startingPrice}</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-lg transition-colors">
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}