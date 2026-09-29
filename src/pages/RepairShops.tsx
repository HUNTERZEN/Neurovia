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
            className="h-4 w-4 ml-2 text-white group-hover:translate-x-1 transition-all duration-300"
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
      <div className="min-h-screen bg-[#080808] relative text-[#e8e8e8]">
        <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="nv-section-label">Verified Network</span>
            <h1 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white">
              Repair Shops <em className="italic text-[#888888]">Near You.</em>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#888888] max-w-2xl mx-auto">
              Find trusted repair shops in your area with verified technicians and genuine spare parts.
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
    <div className="min-h-screen bg-[#080808] relative text-[#e8e8e8]">
      {/* Content */}
      <div className="relative pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="nv-section-label">Verified Network</span>
          <h1 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white">
            Repair Shops <em className="italic text-[#888888]">Near You.</em>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#888888] max-w-2xl mx-auto">
            Find trusted repair shops in your area with verified technicians and genuine spare parts.
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
              <div className="absolute top-4 left-4 bg-[#121214]/90 backdrop-blur-md py-3 px-4 rounded-xl border border-white/10 shadow-xl z-10 pointer-events-none">
                <p className="text-white text-xs font-semibold">San Francisco Bay Area</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[#888888] text-[11px]">{shops.length} repair shops found</p>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <p className="text-white text-[11px] font-medium">Live Network</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Shop List */}
          <motion.div
            className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {shops.length === 0 ? (
                <div className="text-center text-[#888888] p-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-40 text-white" />
                  <p className="text-xs">No repair shops found in this area.</p>
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
                      className={`relative rounded-2xl p-6 cursor-pointer border transition-all duration-300 ${
                        selectedShop === shop.id
                          ? 'border-white bg-[#18181c] shadow-2xl'
                          : 'border-white/[0.08] hover:border-white/20 bg-[#141414]'
                      } ${shop.isPremium ? 'ring-1 ring-white/10' : ''}`}
                      onClick={() => handleShopClick(shop.id)}
                    >
                      {/* Shop Header with Premium Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Syne'] text-lg font-bold text-white">
                            {shop.name}
                          </h3>
                          {shop.isPremium && (
                            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-white/10 rounded-full border border-white/15">
                              <Shield className="w-3 h-3 text-white" />
                              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-amber-400 text-xs font-bold">{shop.rating}</span>
                        </div>
                      </div>

                      {/* Shop Details */}
                      <div className="space-y-2.5 mb-4 text-xs">
                        <div className="flex items-start text-[#888888]">
                          <MapPin className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                          <span className="ml-2 text-[#cccccc]">{shop.address}</span>
                        </div>

                        <div className="flex items-center text-[#888888]">
                          <Clock className="h-4 w-4 text-white flex-shrink-0" />
                          <span className="ml-2">{shop.hours}</span>
                        </div>

                        <div className="flex items-center text-[#888888]">
                          <Phone className="h-4 w-4 text-white flex-shrink-0" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCallShop(shop.phone);
                            }}
                            className="ml-2 text-white hover:underline transition-colors font-medium"
                          >
                            {shop.phone}
                          </button>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-white mb-2">Services</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {shop.services.map((service) => (
                            <span
                              key={service}
                              className="px-2.5 py-1 text-[11px] font-medium text-[#cccccc] bg-white/[0.04] rounded-full border border-white/[0.08]"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2.5">
                        <motion.button
                          className="flex-1"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookAppointment(shop);
                          }}
                          disabled={shop.bookingStatus === 'busy'}
                        >
                          <div className={`rounded-xl px-4 py-3 flex items-center justify-center font-bold text-xs transition-all ${
                            shop.bookingStatus === 'ready-to-pay'
                              ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                              : shop.bookingStatus === 'busy'
                              ? 'bg-white/5 text-[#555555] cursor-not-allowed border border-white/5'
                              : 'btn-primary !w-full'
                          }`}>
                            <span className="flex items-center gap-1.5">
                              {shop.bookingStatus === 'ready-to-pay' && <Lock className="w-3.5 h-3.5" />}
                              {shop.bookingStatus === 'ready-to-pay' && <CreditCard className="w-3.5 h-3.5" />}
                              {getBookingButtonText(shop)}
                            </span>
                            {shop.bookingStatus === 'available' && getBookingButtonIcon(shop)}
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallShop(shop.phone);
                          }}
                          className="px-3.5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10"
                        >
                          <Phone className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Selection Indicator */}
                      {selectedShop === shop.id && (
                        <motion.div
                          className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-white rounded-full shadow-lg"
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
