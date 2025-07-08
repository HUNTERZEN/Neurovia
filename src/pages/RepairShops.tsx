import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, PenTool as Tools, Shield, Search, Filter, ChevronDown, ChevronUp, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  hours: string;
  phone: string;
  services: string[];
  coordinates: [number, number]; // [longitude, latitude]
  markerPosition?: { x: string, y: string }; // Position on static map
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
    coordinates: [-122.4194, 37.7749], // San Francisco coordinates
    markerPosition: { x: "30%", y: "40%" }
  },
  {
    id: 2,
    name: "Gadget Repair Pro",
    address: "456 Tech Ave, Innovation District",
    rating: 4.6,
    hours: "8:00 AM - 7:00 PM",
    phone: "(555) 987-6543",
    services: ["Screen Replacement", "Battery Replacement", "Data Recovery", "Hardware Upgrades"],
    coordinates: [-122.4124, 37.7829],
    markerPosition: { x: "45%", y: "25%" }
  },
  {
    id: 3,
    name: "Digital Device Doctors",
    address: "789 Circuit Lane, Tech Park",
    rating: 4.9,
    hours: "10:00 AM - 8:00 PM",
    phone: "(555) 456-7890",
    services: ["iPhone Repair", "MacBook Repair", "Console Repair", "Diagnostic Services"],
    coordinates: [-122.4264, 37.7679],
    markerPosition: { x: "65%", y: "60%" }
  }
];

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>
      
      {/* Content */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            {/* Static Map Section */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
                {/* Static Map Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950">
                  {/* Subtle grid lines for map effect */}
                  <div className="absolute inset-0 opacity-10" 
                    style={{
                      backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), 
                                       linear-gradient(to bottom, white 1px, transparent 1px)`,
                      backgroundSize: '100px 100px'
                    }}
                  />
                  
                  {/* More detailed grid for street patterns */}
                  <div className="absolute inset-0 opacity-5" 
                    style={{
                      backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), 
                                       linear-gradient(to bottom, white 1px, transparent 1px)`,
                      backgroundSize: '25px 25px'
                    }}
                  />
                  
                  {/* Water features */}
                  <div className="absolute top-[5%] right-[5%] w-1/4 h-1/4 bg-blue-900/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-[10%] right-[15%] w-1/3 h-1/5 bg-blue-900/20 rounded-full blur-xl"></div>
                  
                  {/* Land features */}
                  <div className="absolute top-[30%] left-[10%] w-[40%] h-[30%] bg-gray-800/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-[20%] left-[20%] w-[35%] h-[25%] bg-gray-800/30 rounded-full blur-xl"></div>
                  
                  {/* Major roads - make them more realistic with curves */}
                  <div className="absolute h-[3px] bg-purple-600/30 blur-[1px]"
                    style={{ 
                      top: '35%', 
                      left: '10%', 
                      right: '10%', 
                      transform: 'rotate(2deg)' 
                    }}></div>
                  <div className="absolute h-[2px] bg-purple-500/20 blur-[1px]"
                    style={{ 
                      top: '45%', 
                      left: '5%', 
                      right: '20%', 
                      transform: 'rotate(-1deg)' 
                    }}></div>
                  <div className="absolute h-[2px] bg-purple-500/20 blur-[1px]"
                    style={{ 
                      top: '60%', 
                      left: '15%', 
                      right: '10%', 
                      transform: 'rotate(1deg)' 
                    }}></div>
                    
                  {/* Vertical roads */}
                  <div className="absolute w-[2px] bg-purple-500/20 blur-[1px]"
                    style={{ 
                      left: '30%', 
                      top: '10%', 
                      bottom: '15%',
                      transform: 'rotate(1deg)' 
                    }}></div>
                  <div className="absolute w-[2px] bg-purple-500/20 blur-[1px]"
                    style={{ 
                      left: '60%', 
                      top: '20%', 
                      bottom: '10%',
                      transform: 'rotate(-1deg)' 
                    }}></div>
                    
                  {/* City districts - subtle blocks */}
                  <div className="absolute top-[25%] left-[25%] w-[20%] h-[15%] bg-purple-800/10 rounded-lg blur-[5px]"></div>
                  <div className="absolute top-[50%] left-[40%] w-[15%] h-[15%] bg-purple-800/10 rounded-lg blur-[5px]"></div>
                  <div className="absolute top-[30%] left-[65%] w-[15%] h-[20%] bg-purple-800/10 rounded-lg blur-[5px]"></div>
                </div>
                
                {/* Map Markers - Update to look like nicer map pins */}
                {shops.map((shop) => (
                  <div 
                    key={shop.id}
                    className="absolute"
                    style={{ 
                      top: shop.markerPosition?.y, 
                      left: shop.markerPosition?.x
                    }}
                    onClick={() => setSelectedShop(shop.id)}
                  >
                    <motion.div 
                      className={`
                        cursor-pointer transition-all
                        ${selectedShop === shop.id 
                          ? 'scale-110' 
                          : 'scale-100'
                        }
                      `}
                      whileHover={{ scale: 1.2 }}
                      animate={{ scale: selectedShop === shop.id ? 1.1 : 1 }}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        selectedShop === shop.id 
                          ? 'bg-purple-600 shadow-lg shadow-purple-500/30' 
                          : 'bg-purple-500/80 hover:bg-purple-500'
                      }`}>
                        <MapPin className="w-6 h-6 text-white" strokeWidth={selectedShop === shop.id ? 2.5 : 2} />
                      </div>
                      {selectedShop === shop.id && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 backdrop-blur-md text-white text-xs py-2 px-3 rounded-md whitespace-nowrap border border-purple-500/50 shadow-lg shadow-black/30 font-medium">
                          {shop.name}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
                
                {/* Map Title */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md py-2 px-4 rounded-lg border border-purple-900/30 shadow-lg shadow-black/20">
                  <p className="text-white text-sm font-medium">San Francisco Bay Area</p>
                </div>
                
                {/* Map Controls (Decorative) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-purple-900/30 shadow-lg shadow-black/20 hover:bg-black/80 transition-colors">
                    <ChevronUp className="w-4 h-4 text-white" />
                  </button>
                  <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-purple-900/30 shadow-lg shadow-black/20 hover:bg-black/80 transition-colors">
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Map Attribution - Decorative */}
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 opacity-60">
                  © Neurovia Maps | Stylized Visualization
                </div>
              </div>
            </motion.div>

            {/* Shop List */}
            <motion.div 
              className="space-y-4 overflow-y-auto max-h-[600px] pr-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatePresence>
                {shops.map((shop) => (
                  <motion.div
                    key={shop.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative"
                  >
                    <div
                      className={`
                        relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer border
                        ${selectedShop === shop.id ? 'border-purple-500' : 'border-gray-800 hover:border-purple-500/30'}
                      `}
                      onClick={() => setSelectedShop(shop.id)}
                    >
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                        {shop.name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start text-gray-300">
                          <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="ml-2">{shop.address}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          <span className="ml-2">{shop.rating} / 5.0</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <Clock className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <span className="ml-2">{shop.hours}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                          <span className="ml-2">{shop.phone}</span>
                        </div>

                        <div className="mt-4">
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

                        <motion.button 
                          className="mt-4 w-full"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle booking logic
                          }}
                        >
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                            <div className="relative bg-black rounded-lg px-5 py-3 flex items-center justify-center">
                              <span className="text-white font-semibold group-hover:text-white transition-colors">Book Appointment</span>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 ml-2 text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}