import React, { useState, useEffect } from 'react';
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

interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  hours: string;
  phone: string;
  services: string[];
  coordinates: [number, number];
  markerPosition?: { x: string; y: string };
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
    coordinates: [37.7749, -122.4194],
    markerPosition: { x: "30%", y: "40%" },
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
    coordinates: [37.7849, -122.4094],
    markerPosition: { x: "60%", y: "30%" },
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
    coordinates: [37.7649, -122.4294],
    markerPosition: { x: "45%", y: "60%" },
    isPremium: true,
    bookingStatus: 'ready-to-pay'
  }
];

export function RepairShops() {
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
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent sm:text-5xl">
            Repair Shops Near You
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Find trusted repair shops in your area for all your tech needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Interactive Map with Theme Colors */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950">
                {/* Enhanced Grid Pattern with Theme Colors */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
                    backgroundSize: '25px 25px',
                  }}
                />
                
                {/* Enhanced Geographic Features with Theme Colors */}
                <motion.div 
                  className="absolute top-[5%] right-[5%] w-1/4 h-1/4 bg-gradient-to-r from-purple-900/40 to-blue-900/30 rounded-full blur-xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-[10%] right-[15%] w-1/3 h-1/5 bg-gradient-to-l from-blue-900/30 to-purple-900/20 rounded-full blur-xl"
                  animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <div className="absolute top-[30%] left-[10%] w-[40%] h-[30%] bg-purple-800/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-[20%] left-[20%] w-[35%] h-[25%] bg-blue-800/30 rounded-full blur-xl"></div>
                
                {/* Animated Theme Color Roads - Horizontal */}
                <motion.div 
                  className="absolute h-[3px] bg-gradient-to-r from-purple-600/40 via-blue-500/50 to-purple-600/40 blur-[1px]" 
                  style={{ top: '35%', left: '10%', right: '10%', transform: 'rotate(2deg)' }}
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    background: [
                      'linear-gradient(to right, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.4))',
                      'linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.4))',
                      'linear-gradient(to right, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.4))'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute h-[2px] bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-blue-500/30 blur-[1px]" 
                  style={{ top: '45%', left: '5%', right: '20%', transform: 'rotate(-1deg)' }}
                  animate={{ 
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                
                <motion.div 
                  className="absolute h-[2px] bg-gradient-to-r from-purple-500/25 via-blue-500/35 to-purple-500/25 blur-[1px]" 
                  style={{ top: '60%', left: '15%', right: '10%', transform: 'rotate(1deg)' }}
                  animate={{ 
                    opacity: [0.25, 0.5, 0.25],
                    background: [
                      'linear-gradient(to right, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.35), rgba(168, 85, 247, 0.25))',
                      'linear-gradient(to right, rgba(59, 130, 246, 0.35), rgba(168, 85, 247, 0.45), rgba(59, 130, 246, 0.25))',
                      'linear-gradient(to right, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.35), rgba(168, 85, 247, 0.25))'
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                />
                
                {/* Animated Theme Color Roads - Vertical */}
                <motion.div 
                  className="absolute w-[2px] bg-gradient-to-b from-purple-500/30 via-blue-500/40 to-purple-500/30 blur-[1px]" 
                  style={{ left: '30%', top: '10%', bottom: '15%', transform: 'rotate(1deg)' }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    background: [
                      'linear-gradient(to bottom, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.3))',
                      'linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.3))',
                      'linear-gradient(to bottom, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.3))'
                    ]
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
                />
                
                <motion.div 
                  className="absolute w-[2px] bg-gradient-to-b from-blue-500/25 via-purple-500/35 to-blue-500/25 blur-[1px]" 
                  style={{ left: '60%', top: '20%', bottom: '10%', transform: 'rotate(-1deg)' }}
                  animate={{ 
                    opacity: [0.25, 0.55, 0.25],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }}
                />
              </div>

              {/* Interactive Map Markers with Enhanced Theme Colors */}
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    top: shop.markerPosition?.y || '50%',
                    left: shop.markerPosition?.x || '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleMarkerClick(shop.id)}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: selectedShop === shop.id ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Enhanced Marker Shadow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/40 rounded-full blur-sm" />
                    
                    {/* Premium Ring for Premium Shops */}
                    {shop.isPremium && (
                      <motion.div
                        className="absolute inset-[-8px] rounded-full border-2 border-gradient-to-r from-purple-400 to-blue-400"
                        style={{
                          background: 'conic-gradient(from 0deg, #a855f7, #3b82f6, #a855f7)',
                          padding: '2px',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-full h-full bg-gray-900 rounded-full"></div>
                      </motion.div>
                    )}
                    
                    {/* Main Marker with Enhanced Theme Colors */}
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative ${
                        selectedShop === shop.id
                          ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 ring-4 ring-purple-400/50 shadow-2xl shadow-purple-500/50'
                          : shop.isPremium
                          ? 'bg-gradient-to-br from-purple-500/90 via-blue-500/90 to-purple-600/90 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 shadow-xl shadow-purple-500/30'
                          : 'bg-gradient-to-br from-purple-500/80 via-blue-500/80 to-purple-600/80 hover:from-purple-500/90 hover:via-blue-500/90 hover:to-purple-600/90 shadow-lg'
                      }`}
                    >
                      {/* Pulsing Ring for Selected with Theme Colors */}
                      {selectedShop === shop.id && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-400"
                            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-blue-400"
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          />
                        </>
                      )}
                      
                      <MapPin
                        className="w-6 h-6 text-white drop-shadow-lg"
                        strokeWidth={selectedShop === shop.id ? 2.5 : 2}
                      />
                      
                      {/* Premium Badge */}
                      {shop.isPremium && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Shield className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Enhanced Tooltip with Theme Colors */}
                    {selectedShop === shop.id && (
                      <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black/95 backdrop-blur-md text-white text-sm py-3 px-4 rounded-lg whitespace-nowrap border border-purple-500/60 shadow-2xl z-20"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,0,60,0.95) 100%)'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-semibold text-white flex items-center gap-2">
                          {shop.name}
                          {shop.isPremium && <Shield className="w-3 h-3 text-yellow-400" />}
                        </div>
                        <div className="text-purple-300 text-xs flex items-center gap-2 mt-1">
                          <Star className="w-3 h-3 fill-current" />
                          {shop.rating}
                          <Clock className="w-3 h-3 ml-1" />
                          {shop.hours.split(' - ')[0]}
                        </div>
                        <div className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                          {shop.bookingStatus === 'ready-to-pay' && (
                            <>
                              <Lock className="w-3 h-3 text-green-400" />
                              <span className="text-green-400">Ready to Pay</span>
                            </>
                          )}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">{shop.services[0]}...</div>
                        
                        {/* Enhanced Tooltip Arrow with Theme Color */}
                        <div 
                          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 border-l border-t border-purple-500/60"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,0,60,0.95) 100%)'
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}

              {/* Enhanced Map Header with Theme Colors */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md py-3 px-4 rounded-lg border border-purple-500/30 shadow-xl">
                <p className="text-white text-sm font-medium">San Francisco Bay Area</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-purple-300 text-xs">{shops.length} repair shops found</p>
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <p className="text-blue-300 text-xs">Interactive</p>
                </div>
              </div>

              {/* Enhanced Map Controls with Theme Colors */}
              <div className="absolute top-4 right-4 flex flex-col gap-1">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md p-3 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 shadow-xl"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md p-3 rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 shadow-xl"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              {/* Enhanced Attribution with Theme Colors */}
              <div className="absolute bottom-2 right-2 text-[10px] text-purple-400/60 opacity-80">
                © Neurovia Maps • Interactive • Theme Enhanced
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
