import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Award, Star,
  ArrowLeft, Save, Edit3, Camera, Wrench
} from 'lucide-react';
import API_BASE_URL from "../../config/api"

interface TechnicianProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  experience: number;
  rating: number;
  certifications: string[];
  bio: string;
  avatar?: string;
}

export function TechnicianProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('technicianToken');
        if (!token) {
          navigate('/technician/signin');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/technician/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.technician);
        } else {
          navigate('/technician/signin');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('technicianToken');
      const response = await fetch(`${API_BASE_URL}/api/technician/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setEditing(false);
        // Update localStorage
        localStorage.setItem('technicianData', JSON.stringify(profile));
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/technician/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-4">
              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {editing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {editing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-2xl font-bold text-white bg-white/20 rounded-lg px-3 py-2 w-full"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                )}
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Wrench className="w-4 h-4 text-blue-200" />
                    {editing ? (
                      <input
                        type="text"
                        value={profile.specialization}
                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                        className="text-blue-200 bg-white/20 rounded px-2 py-1"
                      />
                    ) : (
                      <span className="text-blue-200">{profile.specialization}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-blue-200">{profile.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {editing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {editing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{profile.location}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{profile.experience} years experience</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">About</h3>
              {editing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-3">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg">
                    <Award className="w-4 h-4" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
