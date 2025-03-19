import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, PenTool as Tools, Shield, Search, Filter, ChevronDown, ChevronUp, Loader2, Phone } from 'lucide-react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  hours: string;
  phone: string;
  services: string[];
  coordinates: [number, number]; // [longitude, latitude]
}

const shops: Shop[] = [
  {
    id: 1,
    name: "TechFix Solutions",
    address: "123 Main St, City Center",
    rating: 4.8,
    hours: "9:00 AM - 6:00 PM",
    phone: "(555) 123-4567",
    services: ["Phone Repair", "Laptop Repair", "Tablet Repair", "PC Repair"],
    coordinates: [-122.4194, 37.7749] // San Francisco coordinates
  },
  {
    id: 2,
    name: "Gadget Repair Pro",
    address: "456 Tech Ave, Innovation District",
    rating: 4.6,
    hours: "8:00 AM - 7:00 PM",
    phone: "(555) 987-6543",
    services: ["Screen Replacement", "Battery Replacement", "Data Recovery", "Hardware Upgrades"],
    coordinates: [-122.4124, 37.7829]
  },
  {
    id: 3,
    name: "Digital Device Doctors",
    address: "789 Circuit Lane, Tech Park",
    rating: 4.9,
    hours: "10:00 AM - 8:00 PM",
    phone: "(555) 456-7890",
    services: ["iPhone Repair", "MacBook Repair", "Console Repair", "Diagnostic Services"],
    coordinates: [-122.4264, 37.7679]
  }
];

const ShopCardSkeleton = () => (
  <div className="bg-gray-800 rounded-xl p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="space-y-3 flex-1">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
      <div className="w-20 h-8 bg-gray-700 rounded-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-6 bg-gray-700 rounded"></div>
      ))}
    </div>

    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
        <div className="w-24 h-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const MapSkeleton = () => (
  <div className="h-[600px] bg-gray-800 rounded-xl overflow-hidden animate-pulse flex items-center justify-center">
    <div className="text-gray-600 flex flex-col items-center">
      <MapPin className="w-12 h-12 mb-2" />
      <p className="text-lg">Loading map...</p>
    </div>
  </div>
);

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
  };

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-700 rounded-lg overflow-hidden relative"
        >
          <motion.img
            src={image}
            alt={`Shop image ${index + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadedImages[image] ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onLoad={() => handleImageLoad(image)}
            loading="lazy"
          />
          {!loadedImages[image] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export function RepairShops() {
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [expandedShop, setExpandedShop] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleExpand = (shopId: number) => {
    setExpandedShop(expandedShop === shopId ? null : shopId);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Repair Shops Near You</h1>
          <p className="mt-3 text-xl text-gray-400">
            Find trusted repair shops in your area for all your tech needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="h-[600px] bg-gray-800 rounded-xl overflow-hidden">
            <Map
              initialViewState={{
                longitude: -122.4194,
                latitude: 37.7749,
                zoom: 12
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
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
                    ${selectedShop === shop.id ? 'bg-purple-500 text-white scale-125' : 'bg-white text-purple-500'}
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
                  ${selectedShop === shop.id ? 'ring-2 ring-purple-500' : 'hover:bg-gray-700/50'}
                `}
                onClick={() => setSelectedShop(shop.id)}
              >
                <h3 className="text-xl font-semibold text-white mb-4">{shop.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start text-gray-300">
                    <MapPin className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="ml-2">{shop.address}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <span className="ml-2">{shop.rating} / 5.0</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="ml-2">{shop.hours}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="ml-2">{shop.phone}</span>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-white mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 text-xs font-medium text-purple-400 bg-purple-900/30 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle booking logic
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}