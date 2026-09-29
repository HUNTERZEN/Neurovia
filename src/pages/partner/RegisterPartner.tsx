import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench,
  Store,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Clock,
  Shield,
  Star,
  User,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../App';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
];

interface PartnerFormData {
  shopName: string;
  ownerName: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profession: string;
  specializations: string[];
  experience: string;
  description: string;
  servicesOffered: string[];
  availableForCalls: boolean;
  availableForLiveService: boolean;
  workingHours: string;
  certifications: string;
  website: string;
}

const SPECIALIZATIONS = [
  'Smartphone Repair',
  'Laptop Repair',
  'Desktop Repair',
  'Tablet Repair',
  'TV & Display Repair',
  'Printer Repair',
  'Networking & WiFi',
  'Data Recovery',
  'Software Troubleshooting',
  'Virus & Malware Removal',
  'Gaming Console Repair',
  'Smart Home Devices',
  'CCTV & Security Systems',
  'PCB & Circuit Repair'
];

const SERVICES = [
  'On-site Repair',
  'Remote Diagnosis',
  'Live Video Support',
  'Phone Consultation',
  'Pick-up & Delivery',
  'Emergency Repair',
  'Annual Maintenance',
  'Corporate Support'
];

const EXPERIENCE_OPTIONS = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

export function RegisterPartner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<PartnerFormData>({
    shopName: '',
    ownerName: user?.username || user?.name || '',
    email: user?.email || '',
    countryCode: '+91',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    profession: '',
    specializations: [],
    experience: '',
    description: '',
    servicesOffered: [],
    availableForCalls: true,
    availableForLiveService: true,
    workingHours: '9:00 AM - 6:00 PM',
    certifications: '',
    website: ''
  });

  const API_URL = import.meta.env.VITE_API_URL ?? 'https://neurovia-backend.onrender.com';

  const handleChange = (field: keyof PartnerFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleSpecialization = (spec: string) => {
    setFormData(prev => {
      const updated = prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec];
      return { ...prev, specializations: updated };
    });
    if (errors.specializations) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.specializations;
        return next;
      });
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => {
      const updated = prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter(s => s !== service)
        : [...prev.servicesOffered, service];
      return { ...prev, servicesOffered: updated };
    });
    if (errors.servicesOffered) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.servicesOffered;
        return next;
      });
    }
  };

  /* ---------- Validation ---------- */

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Phone number must be exactly 10 digits';
    if (!formData.profession.trim()) newErrors.profession = 'Profession is required';
    if (!formData.experience) newErrors.experience = 'Select your experience';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.specializations.length === 0) newErrors.specializations = 'Select at least one specialization';
    if (formData.servicesOffered.length === 0) newErrors.servicesOffered = 'Select at least one service';
    if (!formData.workingHours.trim()) newErrors.workingHours = 'Working hours are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/api/partner/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        localStorage.setItem('isPartner', 'true');
        localStorage.setItem('partnerData', JSON.stringify(formData));
        setIsSuccess(true);
        setTimeout(() => navigate('/partner/dashboard'), 2500);
      } else {
        const data = await res.json();
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch {
      alert('Network error: Could not connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setErrors({});
    setStep(prev => Math.max(prev - 1, 1));
  };

  /* ---------- Error helper ---------- */
  const FieldError = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1 text-red-400 text-xs mt-1.5"
      >
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </motion.p>
    );
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#080808] text-[#e8e8e8]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative z-10 bg-[#121214] border border-white/[0.08] rounded-3xl p-10 max-w-md w-full shadow-2xl"
        >
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="nv-section-label">Success</span>
          <h2 className="font-['Syne'] text-2xl font-bold text-white mb-2">Registration Submitted</h2>
          <p className="text-xs text-[#888888] mb-4">Welcome to the Neurovia Partner Network</p>
          <p className="text-xs text-[#666666]">Redirecting to your partner portal...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 bg-[#080808] text-[#e8e8e8]">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="nv-section-label">Partner Program</span>
          <h1 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white mb-3">
            Register as a <em className="italic text-[#888888]">Partner.</em>
          </h1>
          <p className="text-sm sm:text-base text-[#888888] max-w-2xl mx-auto">
            Join our network of verified repair experts and local shops. Offer live diagnostics, onsite repair,
            and grow your tech business with Neurovia.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Phone, title: 'Live Calls', desc: 'Get connected with customers needing help' },
            { icon: Shield, title: 'Verified Badge', desc: 'Build trust with a verified partner badge' },
            { icon: Star, title: 'Grow Revenue', desc: 'Expand your customer base online' }
          ].map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-white">
                <benefit.icon className="w-5 h-5" />
              </div>
              <h3 className="font-['Syne'] text-white font-bold text-base mb-1">{benefit.title}</h3>
              <p className="text-[#888888] text-xs">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10 gap-2">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Services' },
            { num: 3, label: 'Review' }
          ].map(s => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s.num < step
                      ? 'bg-white text-black'
                      : s.num === step
                      ? 'bg-white text-black ring-4 ring-white/20'
                      : 'bg-[#18181c] border border-white/10 text-[#666666]'
                  }`}
                >
                  {s.num < step ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[11px] mt-1 font-semibold ${s.num <= step ? 'text-white' : 'text-[#666666]'}`}>
                  {s.label}
                </span>
              </div>
              {s.num < 3 && (
                <div className={`w-12 md:w-20 h-0.5 mx-2 rounded ${s.num < step ? 'bg-white' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Validation error banner */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <p className="text-rose-400 text-xs font-medium">Please fill in all required fields before proceeding.</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-[#141414] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-['Syne'] text-2xl font-bold text-white flex items-center gap-3">
                <User className="w-5 h-5 text-white" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Shop / Business Name <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                    <input
                      type="text"
                      value={formData.shopName}
                      onChange={e => handleChange('shopName', e.target.value)}
                      className={`w-full bg-white/[0.03] border ${errors.shopName ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                      placeholder="Your shop name"
                    />
                  </div>
                  <FieldError field="shopName" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Owner Name <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={e => handleChange('ownerName', e.target.value)}
                      className={`w-full bg-white/[0.03] border ${errors.ownerName ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                      placeholder="Full name"
                    />
                  </div>
                  <FieldError field="ownerName" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Email <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`w-full bg-white/[0.03] border ${errors.email ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <FieldError field="email" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Phone <span className="text-rose-400">*</span></label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={e => handleChange('countryCode', e.target.value)}
                      className="bg-white/[0.03] border border-white/10 rounded-xl px-2.5 py-3 text-white text-xs focus:outline-none focus:border-white/30 transition-all appearance-none min-w-[100px]"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code} className="bg-[#121214]">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', val);
                        }}
                        maxLength={10}
                        className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                  {formData.phone && (
                    <p className={`text-[11px] mt-1 ${formData.phone.length === 10 ? 'text-emerald-400' : 'text-[#666666]'}`}>
                      {formData.phone.length}/10 digits
                    </p>
                  )}
                  <FieldError field="phone" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Profession <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={e => handleChange('profession', e.target.value)}
                      className={`w-full bg-white/[0.03] border ${errors.profession ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                      placeholder="e.g. Electronics Technician"
                    />
                  </div>
                  <FieldError field="profession" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">Experience <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                    <select
                      value={formData.experience}
                      onChange={e => handleChange('experience', e.target.value)}
                      className={`w-full bg-white/[0.03] border ${errors.experience ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all appearance-none`}
                    >
                      <option value="" className="bg-[#121214]">Select experience</option>
                      {EXPERIENCE_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-[#121214]">{opt}</option>
                      ))}
                    </select>
                  </div>
                  <FieldError field="experience" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2">Address <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className={`w-full bg-white/[0.03] border ${errors.address ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                    placeholder="Shop/Office address"
                  />
                </div>
                <FieldError field="address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">City <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    className={`w-full bg-white/[0.03] border ${errors.city ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                    placeholder="City"
                  />
                  <FieldError field="city" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">State <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                    className={`w-full bg-white/[0.03] border ${errors.state ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                    placeholder="State"
                  />
                  <FieldError field="state" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={e => handleChange('zipCode', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Specializations & Services */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-['Syne'] text-2xl font-bold text-white flex items-center gap-3">
                <Wrench className="w-5 h-5 text-white" />
                Specializations & Services
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-3">
                  Select your specializations <span className="text-rose-400">*</span>
                  <span className="text-[#666666] ml-2">({formData.specializations.length} selected)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map(spec => {
                    const isSelected = formData.specializations.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleSpecialization(spec)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.03] border-white/10 text-[#888888] hover:text-white hover:border-white/30'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                        {spec}
                      </button>
                    );
                  })}
                </div>
                <FieldError field="specializations" />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-3">
                  Services you offer <span className="text-rose-400">*</span>
                  <span className="text-[#666666] ml-2">({formData.servicesOffered.length} selected)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(service => {
                    const isSelected = formData.servicesOffered.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.03] border-white/10 text-[#888888] hover:text-white hover:border-white/30'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                        {service}
                      </button>
                    );
                  })}
                </div>
                <FieldError field="servicesOffered" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl px-5 py-4 border border-white/[0.06]">
                  <div>
                    <p className="text-white font-medium text-xs">Available for Live Video Calls</p>
                    <p className="text-[#888888] text-[11px]">Customers can book video sessions with you</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('availableForCalls', !formData.availableForCalls)}
                    className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${
                      formData.availableForCalls ? 'bg-white' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full absolute top-1 transition-transform ${
                        formData.availableForCalls ? 'bg-black translate-x-6' : 'bg-white/40 translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl px-5 py-4 border border-white/[0.06]">
                  <div>
                    <p className="text-white font-medium text-xs">Available for Live Service</p>
                    <p className="text-[#888888] text-[11px]">Offer real-time remote troubleshooting</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('availableForLiveService', !formData.availableForLiveService)}
                    className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${
                      formData.availableForLiveService ? 'bg-white' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full absolute top-1 transition-transform ${
                        formData.availableForLiveService ? 'bg-black translate-x-6' : 'bg-white/40 translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2">Working Hours <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#666666]" />
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={e => handleChange('workingHours', e.target.value)}
                    className={`w-full bg-white/[0.03] border ${errors.workingHours ? 'border-rose-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all`}
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                  />
                </div>
                <FieldError field="workingHours" />
              </div>
            </div>
          )}

          {/* Step 3: About & Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-['Syne'] text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-5 h-5 text-white" />
                About Your Business
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2">Description <span className="text-rose-400">*</span></label>
                <textarea
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={4}
                  className={`w-full bg-white/[0.03] border ${errors.description ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all resize-none`}
                  placeholder="Tell customers about your expertise, services, and what makes your shop special..."
                />
                <FieldError field="description" />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2">Certifications</label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={e => handleChange('certifications', e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="e.g. Apple Certified, CompTIA A+"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-2">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => handleChange('website', e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Review Summary */}
              <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="font-['Syne'] text-base font-bold text-white mb-4">Registration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[#888888]">Shop Name</p>
                    <p className="text-white font-semibold">{formData.shopName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Owner</p>
                    <p className="text-white font-semibold">{formData.ownerName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Profession</p>
                    <p className="text-white font-semibold">{formData.profession || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Experience</p>
                    <p className="text-white font-semibold">{formData.experience || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Location</p>
                    <p className="text-white font-semibold">{formData.city && formData.state ? `${formData.city}, ${formData.state}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Specializations</p>
                    <p className="text-white font-semibold">{formData.specializations.length} selected</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Services</p>
                    <p className="text-white font-semibold">{formData.servicesOffered.length} selected</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Live Calls</p>
                    <p className={formData.availableForCalls ? 'text-emerald-400 font-semibold' : 'text-[#888888]'}>
                      {formData.availableForCalls ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 text-xs font-semibold text-[#888888] hover:text-white transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary !px-7 !py-3 !text-xs font-bold flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary !px-7 !py-3 !text-xs font-bold flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Submit Registration
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
