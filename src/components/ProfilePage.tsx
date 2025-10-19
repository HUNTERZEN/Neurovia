import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Briefcase,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Shield,
  CheckCircle,
  TrendingUp,
  Activity,
  Building
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

  // Handle scroll for header blur effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize profile with user data on mount
  useEffect(() => {
    if (user) {
      initializeProfile(user);
    }
  }, [user, initializeProfile]);

  // Update tempData when profileData changes
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

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    { label: 'Support Tickets', value: 24, icon: Activity, color: 'text-blue-400' },
    { label: 'Resolved Issues', value: 18, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Member Since', value: profileData.joinDate, icon: Calendar, color: 'text-purple-400' },
    { label: 'Account Status', value: 'Verified', icon: Shield, color: 'text-emerald-400' },
  ];

  // Calculate blur intensity based on scroll
  const headerBlur = Math.min(scrollY / 100, 1);
  const headerOpacity = Math.min(0.8 + (scrollY / 500), 0.95);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Enhanced Fixed Header with Dynamic Blur */}
      <div className="relative">
        <motion.div
          className="sticky top-0 z-40 transition-all duration-300"
          style={{
            backdropFilter: `blur(${8 + headerBlur * 12}px)`,
            WebkitBackdropFilter: `blur(${8 + headerBlur * 12}px)`,
          }}
        >
          <div 
            className="relative border-b transition-all duration-300"
            style={{
              backgroundColor: `rgba(17, 24, 39, ${headerOpacity})`,
              borderColor: `rgba(139, 92, 246, ${0.2 + headerBlur * 0.3})`,
            }}
          >
            {/* Dynamic Gradient Overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, 
                  rgba(168, 85, 247, ${0.1 + headerBlur * 0.15}), 
                  rgba(59, 130, 246, ${0.15 + headerBlur * 0.1}), 
                  rgba(168, 85, 247, ${0.1 + headerBlur * 0.15})
                )`,
              }}
              animate={{ 
                background: [
                  `linear-gradient(to right, rgba(168, 85, 247, ${0.1 + headerBlur * 0.15}), rgba(59, 130, 246, ${0.15 + headerBlur * 0.1}), rgba(168, 85, 247, ${0.1 + headerBlur * 0.15}))`,
                  `linear-gradient(to right, rgba(59, 130, 246, ${0.15 + headerBlur * 0.1}), rgba(168, 85, 247, ${0.2 + headerBlur * 0.1}), rgba(59, 130, 246, ${0.1 + headerBlur * 0.15}))`,
                  `linear-gradient(to right, rgba(168, 85, 247, ${0.1 + headerBlur * 0.15}), rgba(59, 130, 246, ${0.15 + headerBlur * 0.1}), rgba(168, 85, 247, ${0.1 + headerBlur * 0.15}))`
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* ✨ UPDATED: Significantly increased padding */}
            <div className="relative max-w-7xl mx-auto px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                {/* Enhanced Compact Avatar */}
                <div className="relative group">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Avatar Ring with Dynamic Glow */}
                    <motion.div 
                      className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full blur transition-all duration-300"
                      style={{ opacity: 0.75 + headerBlur * 0.25 }}
                    />
                    <div className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-2xl">
                      {profileData.profileImage !== '/api/placeholder/150/150' ? (
                        <img 
                          src={profileData.profileImage} 
                          alt={profileData.fullName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                      )}
                    </div>
                    
                    {/* Camera Overlay */}
                    {isEditing && (
                      <motion.div
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Camera className="w-7 h-7 text-white" />
                      </motion.div>
                    )}

                    {/* Verified Badge */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Compact User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={tempData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="text-2xl md:text-3xl font-bold bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={tempData.profession}
                            onChange={(e) => handleInputChange('profession', e.target.value)}
                            className="text-base text-purple-400 bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div>
                          <motion.h1 
                            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {profileData.fullName}
                          </motion.h1>
                          
                          <motion.div
                            className="flex items-center justify-center md:justify-start gap-4 mt-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="flex items-center gap-2 text-base text-purple-300">
                              <Briefcase className="w-5 h-5" />
                              <span>{profileData.profession}</span>
                            </div>
                            <motion.div
                              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Shield className="w-4 h-4" />
                              <span>Verified</span>
                            </motion.div>
                          </motion.div>
                        </div>
                      )}
                      
                      <motion.div
                        className="flex items-center justify-center md:justify-start gap-6 mt-3 text-gray-400 text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profileData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {profileData.joinDate}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-4">
                      {isEditing ? (
                        <>
                          <motion.button
                            onClick={handleSave}
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                            <div className="relative bg-black rounded-lg px-6 py-3 flex items-center gap-2">
                              <Save className="w-5 h-5 text-green-400" />
                              <span className="text-white font-medium">Save</span>
                            </div>
                          </motion.button>

                          <motion.button
                            onClick={handleCancel}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700 hover:border-gray-600 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-5 h-5" />
                            <span>Cancel</span>
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={handleEdit}
                          className="relative group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative bg-black rounded-lg px-6 py-3 flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">Edit</span>
                          </div>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✨ UPDATED: Main Content with much more spacing */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
        {/* Enhanced Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 group-hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <motion.div
                    className={`text-2xl font-bold ${stat.color}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={tempData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            value={tempData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                          <input
                            type="text"
                            value={tempData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                          <input
                            type="text"
                            value={tempData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Profession</label>
                          <input
                            type="text"
                            value={tempData.profession}
                            onChange={(e) => handleInputChange('profession', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                          <input
                            type="text"
                            value={tempData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                        <textarea
                          rows={4}
                          value={tempData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="viewing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                          <p className="text-white text-lg">{profileData.fullName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                          <p className="text-white flex items-center gap-2">
                            <Mail className="w-4 h-4 text-purple-400" />
                            {profileData.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                          <p className="text-white flex items-center gap-2">
                            <Phone className="w-4 h-4 text-purple-400" />
                            {profileData.phone}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                          <p className="text-white flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            {profileData.location}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Profession</label>
                          <p className="text-white flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                            {profileData.profession}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                          <p className="text-white flex items-center gap-2">
                            <Building className="w-4 h-4 text-purple-400" />
                            {profileData.company}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                        <p className="text-white leading-relaxed">{profileData.bio}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Side Panel */}
          <div className="space-y-6">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-6 py-4 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    Social Links
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { icon: Globe, label: 'Website', field: 'website', value: profileData.website, color: 'text-blue-400' },
                    { icon: Github, label: 'GitHub', field: 'github', value: profileData.github, color: 'text-gray-400' },
                    { icon: Linkedin, label: 'LinkedIn', field: 'linkedin', value: profileData.linkedin, color: 'text-blue-500' },
                    { icon: Twitter, label: 'Twitter', field: 'twitter', value: profileData.twitter, color: 'text-blue-400' },
                  ].map((social) => (
                    <motion.div
                      key={social.label}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <social.icon className={`w-5 h-5 ${social.color}`} />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{social.label}</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempData[social.field as keyof typeof tempData] || ''}
                            onChange={(e) => handleInputChange(social.field, e.target.value)}
                            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300"
                            placeholder={`${social.label} ${social.field === 'website' ? 'URL' : 'username'}`}
                          />
                        ) : (
                          <p className="text-gray-400 text-xs">
                            {social.field === 'website' ? 'Website' : `@${social.value || 'yourusername'}`}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Account Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-6 py-4 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Account Stats
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: 'Support Tickets', value: 24, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
                    { label: 'Resolved Issues', value: 18, color: 'text-green-400', bgColor: 'bg-green-500/10' },
                    { label: 'Member Since', value: profileData.joinDate, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between p-3 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <span className="text-gray-300">{stat.label}</span>
                      <span className={`${stat.color} font-semibold px-3 py-1 ${stat.bgColor} rounded-full`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                  <div className="pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between p-3">
                      <span className="text-gray-300 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Account Status
                      </span>
                      <span className="text-emerald-400 font-semibold px-3 py-1 bg-emerald-500/10 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
 