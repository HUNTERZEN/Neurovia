import { useState } from 'react';
import { Video, Mic, MessageSquare, Star, Monitor, Clock, Shield, CreditCard } from 'lucide-react';
import { findServicePackage, ServicePackage } from '../data/serviceCatalog';
import { RazorpayCheckoutModal } from '../components/RazorpayCheckoutModal';

const supportTypes = [
  {
    serviceId: 'remote-video-session',
    icon: <Video className="w-6 h-6" />,
    title: 'Video Call',
    description: 'Face-to-face support with screen sharing and live diagnostics',
    priceInr: 699,
    duration: 30,
  },
  {
    serviceId: 'remote-voice-session',
    icon: <Mic className="w-6 h-6" />,
    title: 'Voice Call',
    description: 'Direct audio assistance with real-time remote screen control',
    priceInr: 499,
    duration: 30,
  },
  {
    serviceId: 'remote-chat-session',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Chat Support',
    description: 'Text-based step-by-step guidance with file and log sharing',
    priceInr: 349,
    duration: 30,
  },
];

const experts = [
  {
    id: 1,
    name: 'Aadhya Patel',
    rating: 4.9,
    reviews: 156,
    specialties: ['Windows', 'macOS', 'Linux'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available Now',
    serviceId: 'remote-quick-fix',
    priceInr: 499,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    rating: 4.8,
    reviews: 142,
    specialties: ['Windows', 'Networking', 'Security'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available in 15 mins',
    serviceId: 'remote-video-session',
    priceInr: 699,
  },
  {
    id: 3,
    name: 'Anika Singh',
    rating: 4.9,
    reviews: 198,
    specialties: ['macOS', 'iOS', 'Data Recovery'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    availability: 'Available Now',
    serviceId: 'remote-virus-opt',
    priceInr: 799,
  },
];

export function GetRemoteHelp() {
  const [selectedType, setSelectedType] = useState<number>(0);
  const [checkoutService, setCheckoutService] = useState<ServicePackage | null>(null);
  const [expertNote, setExpertNote] = useState('');

  const openCheckoutForService = (serviceId: string, note = '') => {
    const pkg = findServicePackage(serviceId);
    if (pkg) {
      setExpertNote(note);
      setCheckoutService(pkg);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Instant Assistance</span>
          <h1 className="page-title !mt-2 !mb-3">
            Remote <em className="italic text-[#888888]">Support.</em>
          </h1>
          <p className="page-sub !max-w-2xl mx-auto">
            Connect with verified technicians instantly over encrypted remote sessions. Pay securely via Razorpay (UPI, Google Pay, Cards) — no fix, no fee.
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-[1160px] mx-auto px-6 lg:px-8 py-16">
        {/* Support Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {supportTypes.map((type, index) => {
            const isSelected = selectedType === index;
            return (
              <div
                key={type.serviceId}
                onClick={() => setSelectedType(index)}
                className={`relative bg-[#141414] rounded-2xl p-6 cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                  isSelected ? 'border-white shadow-2xl bg-[#18181a]' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white">
                      {type.icon}
                    </div>
                    <h3 className="font-['Syne'] text-xl font-bold text-white">{type.title}</h3>
                  </div>
                  <p className="text-sm text-[#888888] leading-relaxed mb-6">{type.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <div>
                    <span className="font-['Syne'] text-2xl font-bold text-white">₹{type.priceInr}</span>
                    <span className="text-xs text-[#888888]">/{type.duration}min</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType(index);
                      openCheckoutForService(type.serviceId, `${type.title} Remote Session`);
                    }}
                    className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Pay &amp; Start →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Experts Section */}
        <div className="border border-white/10 rounded-3xl p-6 sm:p-10 bg-[#121214]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="nv-section-label">Verified Technicians</span>
              <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
                Available <em className="italic text-[#888888]">Experts</em>
              </h2>
            </div>
            <p className="text-xs text-[#888888]">All technicians are vetted, background-checked, and certified.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="bg-[#161618] border border-white/10 hover:border-white/30 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-14 h-14 rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <h3 className="font-['Syne'] text-lg font-bold text-white">{expert.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-white">{expert.rating}</span>
                        <span className="text-xs text-[#888888]">({expert.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#888888] mb-6">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-white/70 shrink-0" />
                      <span>{expert.specialties.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400 font-medium">{expert.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-white/80">Verified Neurovia Specialist</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <div>
                    <span className="text-[11px] text-[#888888] block">Session fee</span>
                    <span className="font-['Syne'] text-lg font-bold text-white">₹{expert.priceInr}</span>
                    <span className="text-xs text-[#888888]">/session</span>
                  </div>

                  <button
                    type="button"
                    className="btn-primary !text-xs !py-2.5 !px-5"
                    onClick={() => {
                      const chosen = supportTypes[selectedType];
                      openCheckoutForService(
                        chosen?.serviceId || expert.serviceId,
                        `Preferred Specialist: ${expert.name}`
                      );
                    }}
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RazorpayCheckoutModal
        service={checkoutService}
        initialCustomer={{ notes: expertNote }}
        onClose={() => setCheckoutService(null)}
      />
    </div>
  );
}

export default GetRemoteHelp;
