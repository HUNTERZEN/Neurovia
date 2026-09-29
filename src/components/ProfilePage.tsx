import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Edit3, Save, X, Camera,
  Briefcase, Calendar, Globe, Github, Linkedin, Twitter,
  Shield, CheckCircle, Activity, Building, Loader2, AlertCircle
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  company: string;
  bio: string;
  profileImage: string;
  joinDate: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

interface ProfilePageProps {
  user?: {
    name?: string;
    email?: string;
  };
  onUpdateProfile?: (profileData: ProfileData) => void;
}

export function ProfilePage({ user, onUpdateProfile }: ProfilePageProps) {
  const { profileData, updateProfile, initializeProfile, isSaving, isLoading } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (user) {
      initializeProfile(user);
    }
  }, [user, initializeProfile]);

  useEffect(() => {
    setTempData(profileData);
  }, [profileData]);

  // Auto-hide save status toast after 3 seconds
  useEffect(() => {
    if (saveStatus !== 'idle') {
      const timer = setTimeout(() => setSaveStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = async () => {
    const success = await updateProfile(tempData);
    if (success) {
      setSaveStatus('success');
      setIsEditing(false);
      if (onUpdateProfile) {
        onUpdateProfile(tempData);
      }
    } else {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    { label: 'Support Tickets', value: 24, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Resolved Issues', value: 18, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Member Since', value: profileData.joinDate || '2026', icon: Calendar, color: 'text-zinc-400', bg: 'bg-white/5' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] pt-28 sm:pt-36 pb-20 px-4 sm:px-6">
      {/* Save Status Toast */}
      <AnimatePresence>
        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-24 left-1/2 z-[100] px-6 py-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 ${
              saveStatus === 'success'
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/20 border-red-500/30 text-red-300'
            }`}
          >
            {saveStatus === 'success' ? (
              <><CheckCircle className="w-5 h-5" /> Profile saved successfully!</>
            ) : (
              <><AlertCircle className="w-5 h-5" /> Failed to save profile. Try again.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1160px] mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-10 bg-[#121214] border border-white/[0.08] rounded-3xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            {/* User Identity */}
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#18181c] border-2 border-white/20 overflow-hidden shadow-2xl flex items-center justify-center">
                  {profileData.profileImage && profileData.profileImage !== '/api/placeholder/150/150' ? (
                    <img src={profileData.profileImage} alt={profileData.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
                      {(profileData.fullName || 'U').split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-1 sm:p-1.5 rounded-full border-2 border-[#080808]">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                {isEditing ? (
                  <div className="space-y-3 w-full max-w-xs mx-auto md:mx-0">
                    <input
                      type="text"
                      value={tempData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-lg font-bold bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-white/30 outline-none w-full"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={tempData.profession}
                      onChange={(e) => handleInputChange('profession', e.target.value)}
                      className="text-xs bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-[#888888] focus:border-white/30 outline-none w-full"
                      placeholder="Profession"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {profileData.fullName || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs sm:text-sm text-[#888888]">
                      <span className="flex items-center gap-1.5 text-white/80">
                        <Briefcase className="w-3.5 h-3.5" /> {profileData.profession || 'Member'}
                      </span>
                      {profileData.location && (
                        <span className="flex items-center gap-1.5 pl-3 border-l border-white/10">
                          <MapPin className="w-3.5 h-3.5" /> {profileData.location}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="btn-outline !text-xs !py-2.5 !px-5"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary !text-xs !py-2.5 !px-6"
                  >
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="btn-outline !text-xs !py-2.5 !px-5"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-[#888888] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}

          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="font-['Syne'] text-2xl font-bold text-emerald-400 mb-1">Verified</h3>
              <p className="text-xs text-[#888888] uppercase tracking-wider">Account Status</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#141414] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
              <h2 className="font-['Syne'] text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <User className="w-5 h-5 text-white/70" /> Personal Information
              </h2>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'Email Address', field: 'email', type: 'email' },
                      { label: 'Phone Number', field: 'phone', type: 'text' },
                      { label: 'Location', field: 'location', type: 'text' },
                      { label: 'Company', field: 'company', type: 'text' },
                    ].map((item) => (
                      <div key={item.field}>
                        <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">{item.label}</label>
                        <input
                          type={item.type}
                          value={tempData[item.field as keyof ProfileData] || ''}
                          onChange={(e) => handleInputChange(item.field as keyof ProfileData, e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">Short Bio</label>
                    <textarea
                      rows={4}
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                    <div>
                      <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5">Email Address</p>
                      <p className="text-white font-medium flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-[#888888]" /> {profileData.email || <span className="text-[#666666] italic">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5">Phone Number</p>
                      <p className="text-white font-medium flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-[#888888]" /> {profileData.phone || <span className="text-[#666666] italic">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5">Location</p>
                      <p className="text-white font-medium flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-[#888888]" /> {profileData.location || <span className="text-[#666666] italic">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5">Company</p>
                      <p className="text-white font-medium flex items-center gap-2 text-sm">
                        <Building className="w-4 h-4 text-[#888888]" /> {profileData.company || <span className="text-[#666666] italic">Not specified</span>}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.08]">
                    <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">About Me</p>
                    <p className="text-sm text-[#888888] leading-relaxed">
                      {profileData.bio || <span className="text-[#666666] italic">No biography provided yet.</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Social Links */}
          <div>
            <div className="bg-[#141414] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
              <h2 className="font-['Syne'] text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-white/70" /> Social Links
              </h2>

              <div className="space-y-3.5">
                {[
                  { icon: Globe, label: 'Website', field: 'website', value: profileData.website },
                  { icon: Github, label: 'GitHub', field: 'github', value: profileData.github },
                  { icon: Linkedin, label: 'LinkedIn', field: 'linkedin', value: profileData.linkedin },
                  { icon: Twitter, label: 'Twitter / X', field: 'twitter', value: profileData.twitter },
                ].map((social) => (
                  <div key={social.label} className="p-3.5 rounded-2xl bg-[#18181c] border border-white/5">
                    <p className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <social.icon className="w-3.5 h-3.5 text-white/70" /> {social.label}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData[social.field as keyof ProfileData] || ''}
                        onChange={(e) => handleInputChange(social.field as keyof ProfileData, e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 pb-1 text-white text-xs focus:outline-none focus:border-white placeholder-[#555555]"
                        placeholder={`Enter ${social.label} link...`}
                      />
                    ) : (
                      <p className="text-xs text-white truncate">
                        {social.value || <span className="text-[#666666] italic">Not specified</span>}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;