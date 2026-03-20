import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Edit3, Save, X, Camera,
  Briefcase, Calendar, Globe, Github, Linkedin, Twitter,
  Shield, CheckCircle, TrendingUp, Activity, Building
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
  const { profileData, updateProfile, initializeProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      initializeProfile(user);
    }
  }, [user, initializeProfile]);

  useEffect(() => {
    setTempData(profileData);
  }, [profileData]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    updateProfile(tempData);
    setIsEditing(false);
    if (onUpdateProfile) {
      onUpdateProfile(tempData);
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
    { label: 'Support Tickets', value: 24, icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Resolved Issues', value: 18, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Member Since', value: profileData.joinDate, icon: Calendar, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  ];

  const headerBlur = Math.min(scrollY / 100, 1);
  const headerOpacity = Math.min(0.3 + (scrollY / 500), 0.8);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-fuchsia-900/10 blur-[100px]" />
      </div>

      {/* Sticky Header */}
      <motion.header
        className="sticky top-0 z-40 border-b border-white/5 transition-all duration-500"
        style={{
          backgroundColor: `rgba(5, 5, 5, ${headerOpacity})`,
          backdropFilter: `blur(${12 + headerBlur * 12}px)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Identity */}
            <div className="flex items-center gap-6">
              <motion.div className="relative group" whileHover={{ scale: 1.02 }}>
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-zinc-900 border-2 border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                  {profileData.profileImage !== '/api/placeholder/150/150' ? (
                    <img src={profileData.profileImage} alt={profileData.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                      {profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1.5 rounded-full border-4 border-[#050505] shadow-lg">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </motion.div>

              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={tempData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-2xl md:text-3xl font-bold bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full max-w-sm"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={tempData.profession}
                      onChange={(e) => handleInputChange('profession', e.target.value)}
                      className="text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full max-w-sm"
                      placeholder="Profession"
                    />
                  </div>
                ) : (
                  <>
                    <motion.h1 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2"
                    >
                      {profileData.fullName}
                    </motion.h1>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="flex flex-wrap items-center gap-3 text-sm text-zinc-400"
                    >
                      <span className="flex items-center gap-1.5 text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        <Briefcase className="w-4 h-4" /> {profileData.profession}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {profileData.location}
                      </span>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-medium transition-all flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2 hover:border-indigo-500/50">
                  <Edit3 className="w-4 h-4 text-indigo-400" /> Edit Profile
                </button>
              )}
            </div>
            
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 group-hover:scale-105 origin-left transition-transform">{stat.value}</h3>
              <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-1">Verified</h3>
              <p className="text-sm text-emerald-500/70 font-medium">Account Status</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                <User className="w-5 h-5 text-indigo-400" /> Personal Information
              </h2>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Email Address', field: 'email', type: 'email' },
                        { label: 'Phone Number', field: 'phone', type: 'text' },
                        { label: 'Location', field: 'location', type: 'text' },
                        { label: 'Company', field: 'company', type: 'text' },
                      ].map((item) => (
                        <div key={item.field}>
                          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{item.label}</label>
                          <input
                            type={item.type}
                            value={tempData[item.field as keyof ProfileData] || ''}
                            onChange={(e) => handleInputChange(item.field as keyof ProfileData, e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Short Bio</label>
                      <textarea
                        rows={4}
                        value={tempData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="viewing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                      <div className="group">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Email Address</p>
                        <p className="text-zinc-200 font-medium flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                          <Mail className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400" /> {profileData.email}
                        </p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Phone Number</p>
                        <p className="text-zinc-200 font-medium flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                          <Phone className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400" /> {profileData.phone}
                        </p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                        <p className="text-zinc-200 font-medium flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                          <MapPin className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400" /> {profileData.location}
                        </p>
                      </div>
                      <div className="group">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Company</p>
                        <p className="text-zinc-200 font-medium flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                          <Building className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400" /> {profileData.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">About Me</p>
                      <p className="text-zinc-300 leading-relaxed max-w-3xl">
                        {profileData.bio || "No biography provided yet."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Socials */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <Globe className="w-5 h-5 text-violet-400" /> Social Links
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: Globe, label: 'Website', field: 'website', value: profileData.website, color: 'text-zinc-300' },
                  { icon: Github, label: 'GitHub', field: 'github', value: profileData.github, color: 'text-zinc-300' },
                  { icon: Linkedin, label: 'LinkedIn', field: 'linkedin', value: profileData.linkedin, color: 'text-blue-400' },
                  { icon: Twitter, label: 'Twitter', field: 'twitter', value: profileData.twitter, color: 'text-sky-400' },
                ].map((social) => (
                  <div key={social.label} className="group relative">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                        <social.icon className={`w-5 h-5 ${social.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">{social.label}</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempData[social.field as keyof ProfileData] || ''}
                            onChange={(e) => handleInputChange(social.field as keyof ProfileData, e.target.value)}
                            className="w-full bg-transparent border-b border-indigo-500/50 pb-1 text-zinc-200 text-sm focus:outline-none focus:border-indigo-400 placeholder-zinc-700"
                            placeholder={`Enter ${social.label} link...`}
                          />
                        ) : (
                          <p className="text-sm text-zinc-300 truncate">
                            {social.value || <span className="text-zinc-600 italic">Not specified</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ProfilePage;