import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Lock,
  CreditCard,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import API_BASE_URL from '../config/api';
import { findServicePackage, ServicePackage } from '../data/serviceCatalog';
import { RazorpayCheckoutModal } from '../components/RazorpayCheckoutModal';

interface Shop {
  id: string;
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

const VERIFIED_ASSAM_HUBS: Shop[] = [
  {
    id: 'nv-ghy-1',
    name: 'Neurovia Nexus Dispatch Hub — GS Road',
    address: 'GS Road, Christian Basti, Guwahati, Assam 781005',
    rating: 4.9,
    hours: '9:00 AM - 7:00 PM IST',
    phone: '+91 88220 96485',
    services: ['Laptop & MacBook Repair', 'Data Recovery', 'Office Network Setup'],
    coordinates: { lat: 26.1584, lng: 91.7694 },
    isPremium: true,
    bookingStatus: 'ready-to-pay',
  },
  {
    id: 'nv-ghy-2',
    name: 'Computech Partner Center — Panbazar',
    address: 'Panbazar IT Market, Guwahati, Assam 781001',
    rating: 4.8,
    hours: '9:30 AM - 7:30 PM IST',
    phone: '+91 88220 96485',
    services: ['Desktop Hardware', 'SSD & RAM Upgrade', 'Screen Replacement'],
    coordinates: { lat: 26.1866, lng: 91.7450 },
    isPremium: true,
    bookingStatus: 'ready-to-pay',
  },
  {
    id: 'nv-ghy-3',
    name: 'Neurovia Express Care — Beltola',
    address: 'Beltola Tiniali, Guwahati, Assam 781028',
    rating: 4.7,
    hours: '10:00 AM - 7:00 PM IST',
    phone: '+91 88220 96485',
    services: ['WiFi & CCTV Setup', 'Virus Removal', 'Printer & OS Fix'],
    coordinates: { lat: 26.1219, lng: 91.7985 },
    isPremium: false,
    bookingStatus: 'available',
  },
];

const DEFAULT_CENTER = {
  lat: 26.1584,
  lng: 91.7694,
};

const mapOptions = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  ],
  disableDefaultUI: false,
  zoomControl: true,
};

export function RepairShops() {
  const hasMapsKey = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const [shops, setShops] = useState<Shop[]>(VERIFIED_ASSAM_HUBS);
  const [selectedShop, setSelectedShop] = useState<string | null>(VERIFIED_ASSAM_HUBS[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutService, setCheckoutService] = useState<ServicePackage | null>(null);
  const [shopNote, setShopNote] = useState('');

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/partner/shops`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data?.shops) && data.shops.length > 0) {
          const partnerMapped: Shop[] = data.shops.map((p: any, idx: number) => ({
            id: p.id || `partner-${idx}`,
            name: p.name,
            address: p.address,
            rating: p.rating || 4.9,
            hours: p.hours || '9:00 AM - 7:00 PM',
            phone: p.phone,
            services: p.services || ['Hardware Repair'],
            coordinates: {
              lat: DEFAULT_CENTER.lat + (idx + 1) * 0.012,
              lng: DEFAULT_CENTER.lng + (idx + 1) * 0.012,
            },
            isPremium: true,
            bookingStatus: p.bookingStatus || 'ready-to-pay',
          }));
          const merged = [...partnerMapped, ...VERIFIED_ASSAM_HUBS];
          setShops(merged);
          setSelectedShop(merged[0].id);
        }
      })
      .catch(() => {
        // Fallback to verified Assam hubs
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleMarkerClick = (shopId: string) => {
    setSelectedShop(shopId);
    const element = document.getElementById(`shop-${shopId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBookAppointment = (shop: Shop) => {
    const pkg = findServicePackage('onsite-visit-diag');
    if (pkg) {
      setShopNote(`Workshop / Hub: ${shop.name} (${shop.address})`);
      setCheckoutService(pkg);
    }
  };

  const handleCallShop = (phone: string) => {
    window.open(`tel:${phone.replace(/\s+/g, '')}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] relative text-[#e8e8e8]">
        <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
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
      <div className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="nv-section-label">Verified Network</span>
          <h1 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white">
            Repair Shops <em className="italic text-[#888888]">Near You.</em>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#888888] max-w-2xl mx-auto">
            Book verified partner workshops and Neurovia dispatch centers with instant Razorpay checkout (₹599 visit &amp; diagnostics) or register your own shop.
          </p>
          <div className="mt-4">
            <Link to="/register-partner" className="text-xs text-[#8bb4ff] hover:underline font-semibold">
              Own a repair workshop? Register as a Neurovia Partner →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Map */}
          <div className="relative">
            <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] bg-[#121214] rounded-2xl overflow-hidden border border-white/10">
              {hasMapsKey && isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
                  center={DEFAULT_CENTER}
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
                    />
                  ))}

                  {selectedShop && shops.find((s) => s.id === selectedShop) && (
                    <InfoWindowF
                      position={shops.find((s) => s.id === selectedShop)!.coordinates}
                      onCloseClick={() => setSelectedShop(null)}
                    >
                      <div className="p-2 min-w-[150px]">
                        <h3 className="font-bold text-gray-900">
                          {shops.find((s) => s.id === selectedShop)!.name}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {shops.find((s) => s.id === selectedShop)!.address}
                        </p>
                      </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#121218] to-[#0b0b0e]">
                  <MapPin className="w-12 h-12 text-[#4f7fff] mb-3" />
                  <h3 className="font-['Syne'] text-xl font-bold text-white mb-1">
                    Guwahati &amp; Assam Service Network
                  </h3>
                  <p className="text-xs text-[#888888] max-w-sm">
                    Select any verified partner hub on the right to schedule an instant doorstep technician or workshop visit.
                  </p>
                </div>
              )}

              <div className="absolute top-4 left-4 bg-[#121214]/90 backdrop-blur-md py-3 px-4 rounded-xl border border-white/10 shadow-xl z-10 pointer-events-none">
                <p className="text-white text-xs font-semibold">Guwahati, Assam &amp; Partner Hubs</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[#888888] text-[11px]">{shops.length} verified hubs</p>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <p className="text-emerald-400 text-[11px] font-medium">Live Network</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shop List */}
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
            <AnimatePresence>
              {shops.map((shop) => (
                <motion.div
                  key={shop.id}
                  id={`shop-${shop.id}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div
                    className={`relative rounded-2xl p-6 cursor-pointer border transition-all duration-300 ${
                      selectedShop === shop.id
                        ? 'border-white bg-[#18181c] shadow-2xl'
                        : 'border-white/[0.08] hover:border-white/20 bg-[#141414]'
                    }`}
                    onClick={() => setSelectedShop(shop.id)}
                  >
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-['Syne'] text-lg font-bold text-white">{shop.name}</h3>
                        {shop.isPremium && (
                          <div className="flex items-center gap-1 px-2.5 py-0.5 bg-white/10 rounded-full border border-white/15">
                            <Shield className="w-3 h-3 text-emerald-400" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 text-xs font-bold">{shop.rating}</span>
                      </div>
                    </div>

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
                          type="button"
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

                    <div className="mb-4">
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

                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAppointment(shop);
                        }}
                        disabled={shop.bookingStatus === 'busy'}
                      >
                        <div
                          className={`rounded-xl px-4 py-3 flex items-center justify-center font-bold text-xs transition-all ${
                            shop.bookingStatus === 'ready-to-pay'
                              ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                              : 'btn-primary !w-full'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {shop.bookingStatus === 'ready-to-pay' ? (
                              <>
                                <Lock className="w-3.5 h-3.5" />
                                <CreditCard className="w-3.5 h-3.5" />
                                Pay ₹599 &amp; Book Visit
                              </>
                            ) : (
                              <>Book Visit (₹599) →</>
                            )}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallShop(shop.phone);
                        }}
                        aria-label="Call shop"
                        className="px-3.5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <RazorpayCheckoutModal
        service={checkoutService}
        initialCustomer={{ notes: shopNote }}
        onClose={() => setCheckoutService(null)}
      />
    </div>
  );
}
