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
      localStorage.setItem('isPartner', 'true');
      localStorage.setItem('partnerData', JSON.stringify(formData));
      setIsSuccess(true);
      setTimeout(() => navigate('/partner/dashboard'), 2500);
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
      <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Theme background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">Registration Successful!</h2>
          <p className="text-gray-400 mb-2">Welcome to Neurovia Partner Network</p>
          <p className="text-gray-500 text-sm">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      {/* Theme background — matches website hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
      <div className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Store className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Partner Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Register as a{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Partner
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our network of verified repair experts. Offer live services, video calls,
            and grow your business with Neurovia.
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
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-5 text-center"
            >
              <benefit.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
              <p className="text-gray-500 text-sm">{benefit.desc}</p>
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    s.num < step
                      ? 'bg-green-500 text-white'
                      : s.num === step
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/80 text-gray-500'
                  }`}
                >
                  {s.num < step ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-xs mt-1 ${s.num <= step ? 'text-purple-400' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
              {s.num < 3 && (
                <div className={`w-16 md:w-24 h-1 mx-2 rounded ${s.num < step ? 'bg-green-500' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Validation error banner */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-400 text-sm">Please fill in all required fields before proceeding.</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 md:p-8"
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <User className="w-6 h-6 text-purple-400" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Shop / Business Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.shopName}
                      onChange={e => handleChange('shopName', e.target.value)}
                      className={`w-full bg-gray-800/50 border ${errors.shopName ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                      placeholder="Your shop name"
                    />
                  </div>
                  <FieldError field="shopName" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Owner Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={e => handleChange('ownerName', e.target.value)}
                      className={`w-full bg-gray-800/50 border ${errors.ownerName ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                      placeholder="Full name"
                    />
                  </div>
                  <FieldError field="ownerName" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <FieldError field="email" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone <span className="text-red-400">*</span></label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={e => handleChange('countryCode', e.target.value)}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-2 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors appearance-none text-sm min-w-[110px]"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code} className="bg-gray-900">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', val);
                        }}
                        maxLength={10}
                        className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                  {formData.phone && (
                    <p className={`text-xs mt-1 ${formData.phone.length === 10 ? 'text-green-400' : 'text-gray-500'}`}>
                      {formData.phone.length}/10 digits
                    </p>
                  )}
                  <FieldError field="phone" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Profession <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={e => handleChange('profession', e.target.value)}
                      className={`w-full bg-gray-800/50 border ${errors.profession ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                      placeholder="e.g. Electronics Technician"
                    />
                  </div>
                  <FieldError field="profession" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Experience <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <select
                      value={formData.experience}
                      onChange={e => handleChange('experience', e.target.value)}
                      className={`w-full bg-gray-800/50 border ${errors.experience ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors appearance-none`}
                    >
                      <option value="" className="bg-gray-900">Select experience</option>
                      {EXPERIENCE_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
                      ))}
                    </select>
                  </div>
                  <FieldError field="experience" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Address <span className="text-red-400">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className={`w-full bg-gray-800/50 border ${errors.address ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                    placeholder="Shop/Office address"
                  />
                </div>
                <FieldError field="address" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">City <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    className={`w-full bg-gray-800/50 border ${errors.city ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                    placeholder="City"
                  />
                  <FieldError field="city" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">State <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                    className={`w-full bg-gray-800/50 border ${errors.state ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
                    placeholder="State"
                  />
                  <FieldError field="state" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={e => handleChange('zipCode', e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Specializations & Services */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Wrench className="w-6 h-6 text-purple-400" />
                Specializations & Services
              </h2>

              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Select your specializations <span className="text-red-400">*</span>
                  <span className="text-gray-600 ml-2">({formData.specializations.length} selected)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.specializations.includes(spec)
                          ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                          : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {formData.specializations.includes(spec) && (
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                      )}
                      {spec}
                    </button>
                  ))}
                </div>
                <FieldError field="specializations" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Services you offer <span className="text-red-400">*</span>
                  <span className="text-gray-600 ml-2">({formData.servicesOffered.length} selected)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.servicesOffered.includes(service)
                          ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                          : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {formData.servicesOffered.includes(service) && (
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                      )}
                      {service}
                    </button>
                  ))}
                </div>
                <FieldError field="servicesOffered" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center justify-between bg-gray-800/30 rounded-lg px-5 py-4 border border-gray-700/30">
                  <div>
                    <p className="text-white font-medium">Available for Live Video Calls</p>
                    <p className="text-gray-500 text-sm">Customers can book video sessions with you</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('availableForCalls', !formData.availableForCalls)}
                    className={`w-12 h-7 rounded-full transition-all relative shrink-0 ${
                      formData.availableForCalls ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                        formData.availableForCalls ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-800/30 rounded-lg px-5 py-4 border border-gray-700/30">
                  <div>
                    <p className="text-white font-medium">Available for Live Service</p>
                    <p className="text-gray-500 text-sm">Offer real-time remote troubleshooting</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('availableForLiveService', !formData.availableForLiveService)}
                    className={`w-12 h-7 rounded-full transition-all relative shrink-0 ${
                      formData.availableForLiveService ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                        formData.availableForLiveService ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Working Hours <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={e => handleChange('workingHours', e.target.value)}
                    className={`w-full bg-gray-800/50 border ${errors.workingHours ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors`}
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
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-400" />
                About Your Business
              </h2>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description <span className="text-red-400">*</span></label>
                <textarea
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={4}
                  className={`w-full bg-gray-800/50 border ${errors.description ? 'border-red-500/50' : 'border-gray-700/50'} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors resize-none`}
                  placeholder="Tell customers about your expertise, services, and what makes your shop special..."
                />
                <FieldError field="description" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Certifications</label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={e => handleChange('certifications', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="e.g. Apple Certified, CompTIA A+"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => handleChange('website', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Review Summary */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Registration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Shop Name</p>
                    <p className="text-white">{formData.shopName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Owner</p>
                    <p className="text-white">{formData.ownerName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Profession</p>
                    <p className="text-white">{formData.profession || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="text-white">{formData.experience || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="text-white">{formData.city && formData.state ? `${formData.city}, ${formData.state}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Specializations</p>
                    <p className="text-purple-400">{formData.specializations.length} selected</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Services</p>
                    <p className="text-blue-400">{formData.servicesOffered.length} selected</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Live Calls</p>
                    <p className={formData.availableForCalls ? 'text-green-400' : 'text-gray-500'}>
                      {formData.availableForCalls ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800/50">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
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
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
