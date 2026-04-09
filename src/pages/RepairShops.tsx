import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Star,
  Clock,
  Phone,
  ChevronDown,
  ChevronUp,
  Lock,
  CreditCard,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  hours: string;
  phone: string;
  services: string[];
  coordinates: { lat: number; lng: number };
  isPremium?: boolean;
  bookingStatus?: 'available' | 'ready-to-pay' | 'busy';
}

const ShopCardSkeleton = () => (
  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 animate-pulse border border-gray-800">
    <div className="flex items-start justify-between mb-4">
      <div className="space-y-3 flex-1">
        <div className="h-6 bg-gray-800/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800/50 rounded w-1/4"></div>
        <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
      </div>
      <div className="w-20 h-8 bg-gray-800/50 rounded-full"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-6 bg-gray-800/50 rounded"></div>
      ))}
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
      <div className="space-y-2">
        <div className="h-4 bg-gray-800/50 rounded w-20"></div>
        <div className="h-6 bg-gray-800/50 rounded w-16"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-800/50 rounded-lg"></div>
        <div className="w-24 h-10 bg-gray-800/50 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const MapSkeleton = () => (
  <div className="h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden animate-pulse flex items-center justify-center border border-gray-800">
    <div className="text-gray-600 flex flex-col items-center">
      <MapPin className="w-12 h-12 mb-2" />
      <p className="text-lg">Loading map...</p>
    </div>
  </div>
);

// Enhanced mock data with premium and booking status
const MOCK_SHOPS: Shop[] = [
  {
    id: 1,
    name: "TechFix Pro",
    address: "123 Main Street, San Francisco, CA 94102",
    rating: 4.8,
    hours: "9:00 AM - 6:00 PM",
    phone: "(555) 123-4567",
    services: ["Phone Repair", "Laptop Repair", "Data Recovery"],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    isPremium: true,
    bookingStatus: 'ready-to-pay'
  },
  {
    id: 2,
    name: "Quick Repairs",
    address: "456 Oak Avenue, San Francisco, CA 94103",
    rating: 4.5,
    hours: "8:00 AM - 7:00 PM",
    phone: "(555) 987-6543",
    services: ["Screen Replacement", "Battery Replacement", "Water Damage"],
    coordinates: { lat: 37.7849, lng: -122.4094 },
    isPremium: false,
    bookingStatus: 'available'
  },
  {
    id: 3,
    name: "Digital Solutions",
    address: "789 Pine Street, San Francisco, CA 94104",
    rating: 4.6,
    hours: "10:00 AM - 8:00 PM",
    phone: "(555) 456-7890",
    services: ["Gaming Console Repair", "Tablet Repair", "Software Issues"],
    coordinates: { lat: 37.7649, lng: -122.4294 },
    isPremium: true,
    bookingStatus: 'ready-to-pay'
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.75rem'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const mapOptions = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
  disableDefaultUI: false,
  zoomControl: true,
};

export function RepairShops() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMarkerClick = (shopId: number) => {
    setSelectedShop(shopId);
    // Scroll to shop card
    const element = document.getElementById(`shop-${shopId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleShopClick = (shopId: number) => {
    setSelectedShop(shopId);
  };

  const handleBookAppointment = (shop: Shop) => {
    if (shop.bookingStatus === 'ready-to-pay') {
      alert(`🔒 Secure Payment Required\n\nShop: ${shop.name}\nRating: ${shop.rating}⭐\nPhone: ${shop.phone}\n\nClick "Pay Now" to proceed with booking.`);
    } else {
      alert(`Booking appointment with ${shop.name}\nPhone: ${shop.phone}\nStatus: Available for booking`);
    }
  };

  const handleCallShop = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const getBookingButtonText = (shop: Shop) => {
    switch (shop.bookingStatus) {
      case 'ready-to-pay':
        return 'Ready to Pay';
      case 'busy':
        return 'Fully Booked';
      default:
        return 'Book Appointment';
    }
  };

  const getBookingButtonIcon = (shop: Shop) => {
    switch (shop.bookingStatus) {
      case 'ready-to-pay':
        return <Lock className="w-4 h-4" />;
      case 'busy':
        return <Clock className="w-4 h-4" />;
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2 text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setShops(MOCK_SHOPS);
        
        // Auto-select first shop
        if (MOCK_SHOPS.length > 0) {
          setSelectedShop(MOCK_SHOPS[0].id);
        }
      } catch (err) {
        console.error('Error loading shops:', err);
        setError('Failed to load shops');
        // Still set mock data even if there's an error
        setShops(MOCK_SHOPS);
        if (MOCK_SHOPS.length > 0) {
          setSelectedShop(MOCK_SHOPS[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent sm:text-5xl">
              Repair Shops Near You
            </h1>
            <p className="mt-4 text-xl text-gray-400">
              Find trusted repair shops in your area for all your tech needs
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <MapSkeleton />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <ShopCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>

      {/* Content */}
      <div className="relative pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent sm:text-5xl">
            Repair Shops Near You
          </h1>
          <p className="mt-4 text-sm sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Find trusted repair shops in your area for all your tech needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Real Google Map Integration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
                  center={center}
                  zoom={12}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={mapOptions}
                >
                  {shops.map((shop) => (
                    <MarkerF
                      key={shop.id}
                      position={shop.coordinates}
                      onClick={() => handleMarkerClick(shop.id)}
                      animation={selectedShop === shop.id && typeof google !== 'undefined' ? google.maps.Animation.BOUNCE : undefined}
                    />
                  ))}
                  
                  {selectedShop && shops.find(s => s.id === selectedShop) && (
                    <InfoWindowF
                      position={shops.find(s => s.id === selectedShop)!.coordinates}
                      onCloseClick={() => setSelectedShop(null)}
                    >
                      <div className="p-2 min-w-[150px]">
                        <h3 className="font-bold text-gray-900">{shops.find(s => s.id === selectedShop)!.name}</h3>
                        <p className="text-sm text-gray-700">{shops.find(s => s.id === selectedShop)!.address}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{shops.find(s => s.id === selectedShop)!.rating}</span>
                        </div>
                      </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
              ) : (
                <MapSkeleton />
              )}

              {/* Enhanced Map Header Overlay */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md py-3 px-4 rounded-lg border border-purple-500/30 shadow-xl z-10 pointer-events-none">
                <p className="text-white text-sm font-medium">San Francisco Bay Area</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-purple-300 text-xs">{shops.length} repair shops found</p>
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <p className="text-blue-300 text-xs">Live Map</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Shop List */}
          <motion.div
            className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {shops.length === 0 ? (
                <div className="text-center text-gray-400 p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No repair shops found.</p>
                </div>
              ) : (
                shops.map((shop) => (
                  <motion.div
                    key={shop.id}
                    id={`shop-${shop.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative"
                  >
                    <div
                      className={`relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer border transition-all duration-300 ${
                        selectedShop === shop.id
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-gray-900/70'
                          : 'border-gray-800 hover:border-purple-500/30 hover:bg-gray-900/60'
                      } ${shop.isPremium ? 'ring-1 ring-purple-500/20' : ''}`}
                      onClick={() => handleShopClick(shop.id)}
                    >
                      {/* Shop Header with Premium Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {shop.name}
                          </h3>
                          {shop.isPremium && (
                            <motion.div
                              className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 rounded-full border border-yellow-400/20"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <Shield className="w-3 h-3 text-yellow-400" />
                              <span className="text-yellow-400 text-xs font-medium">Premium</span>
                            </motion.div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-yellow-500 text-sm font-medium">{shop.rating}</span>
                        </div>
                      </div>

                      {/* Shop Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start text-gray-300">
                          <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="ml-2">{shop.address}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <Clock className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <span className="ml-2">{shop.hours}</span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCallShop(shop.phone);
                            }}
                            className="ml-2 hover:text-purple-400 transition-colors underline decoration-dotted"
                          >
                            {shop.phone}
                          </button>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-white mb-2">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {shop.services.map((service) => (
                            <span
                              key={service}
                              className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookAppointment(shop);
                          }}
                          disabled={shop.bookingStatus === 'busy'}
                        >
                          <div className="relative group">
                            <div className={`absolute -inset-0.5 rounded-lg blur transition-all duration-300 ${
                              shop.bookingStatus === 'ready-to-pay'
                                ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 opacity-75 group-hover:opacity-100'
                                : shop.bookingStatus === 'busy'
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 opacity-50'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 opacity-60 group-hover:opacity-100'
                            }`}></div>
                            <div className={`relative rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-300 ${
                              shop.bookingStatus === 'ready-to-pay'
                                ? 'bg-gradient-to-r from-green-900/80 to-emerald-900/80 hover:from-green-900/90 hover:to-emerald-900/90'
                                : shop.bookingStatus === 'busy'
                                ? 'bg-gray-800 cursor-not-allowed'
                                : 'bg-black hover:bg-gray-900'
                            }`}>
                              <span className={`font-semibold flex items-center gap-2 ${
                                shop.bookingStatus === 'ready-to-pay'
                                  ? 'text-green-300'
                                  : shop.bookingStatus === 'busy'
                                  ? 'text-gray-500'
                                  : 'text-white'
                              }`}>
                                {shop.bookingStatus === 'ready-to-pay' && <Lock className="w-4 h-4" />}
                                {shop.bookingStatus === 'ready-to-pay' && <CreditCard className="w-4 h-4" />}
                                {getBookingButtonText(shop)}
                              </span>
                              {shop.bookingStatus === 'available' && getBookingButtonIcon(shop)}
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallShop(shop.phone);
                          }}
                          className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 hover:border-gray-600 group"
                        >
                          <Phone className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                        </motion.button>
                      </div>

                      {/* Enhanced Selection Indicator with Theme Colors */}
                      {selectedShop === shop.id && (
                        <motion.div
                          className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-600 rounded-full shadow-lg"
                          layoutId="selected-indicator"
                        />
                      )}

                      {/* Booking Status Indicator */}
                      <div className="absolute top-2 right-2">
                        {shop.bookingStatus === 'ready-to-pay' && (
                          <motion.div
                            className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        {shop.bookingStatus === 'busy' && (
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                        )}
                        {shop.bookingStatus === 'available' && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
