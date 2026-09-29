import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Award, Star,
  ArrowLeft, Save, Edit3, Camera, Wrench
} from 'lucide-react';
import API_BASE_URL from "../../config/api";

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
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-[#888888]">Loading profile...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      {/* Header */}
      <header className="bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/technician/dashboard')}
              className="flex items-center gap-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-3">
              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary !px-4 !py-2 !text-xs flex items-center gap-2 font-bold disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="btn-primary !px-4 !py-2 !text-xs flex items-center gap-2 font-bold"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#141414] rounded-3xl border border-white/[0.08] overflow-hidden">
          {/* Profile Header Banner */}
          <div className="bg-[#18181c] p-8 border-b border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <div className="w-24 h-24 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {editing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-[#080808] rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                {editing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="font-['Syne'] text-2xl font-bold text-white bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 w-full"
                  />
                ) : (
                  <h1 className="font-['Syne'] text-2xl font-bold text-white">{profile.name}</h1>
                )}
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#888888]">
                    <Wrench className="w-3.5 h-3.5 text-white" />
                    {editing ? (
                      <input
                        type="text"
                        value={profile.specialization}
                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                        className="text-white bg-white/[0.05] border border-white/10 rounded px-2 py-1 text-xs"
                      />
                    ) : (
                      <span className="text-white font-medium">{profile.specialization}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-[#888888] font-semibold">{profile.rating.toFixed(1)} Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-['Syne'] text-lg font-bold text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <Mail className="w-4 h-4 text-[#888888] shrink-0" />
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  ) : (
                    <span className="text-xs text-[#888888]">{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <Phone className="w-4 h-4 text-[#888888] shrink-0" />
                  {editing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  ) : (
                    <span className="text-xs text-[#888888]">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <MapPin className="w-4 h-4 text-[#888888] shrink-0" />
                  {editing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  ) : (
                    <span className="text-xs text-[#888888]">{profile.location}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <Calendar className="w-4 h-4 text-[#888888] shrink-0" />
                  <span className="text-xs text-[#888888]">{profile.experience} years experience</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-['Syne'] text-lg font-bold text-white mb-4">About</h3>
              {editing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-xs text-white resize-none focus:outline-none focus:border-white/20"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm text-[#888888] leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-['Syne'] text-lg font-bold text-white mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2.5">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/[0.04] border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                    <Award className="w-3.5 h-3.5 text-white" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
