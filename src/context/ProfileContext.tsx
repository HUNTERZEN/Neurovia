import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  company: string;
  joinDate: string;
  bio: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  profileImage: string;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  initializeProfile: (userData: { name?: string; email?: string }) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const DEFAULT_PROFILE: ProfileData = {
  fullName: 'Madhurjya Bordoloi',
  email: 'bm685810@gmail.com',
  phone: '+91 98765 43210',
  location: 'Assam, India',
  profession: 'Full Stack Developer',
  company: 'Tech Solutions Inc.',
  joinDate: '2024',
  bio: 'Passionate about creating innovative tech solutions and helping users with their device issues.',
  website: 'https://yourwebsite.com',
  github: 'yourusername',
  linkedin: 'yourusername',
  twitter: 'yourusername',
  profileImage: '/api/placeholder/150/150'
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE);

  // Fetch true profile data from backend on mount
  useEffect(() => {
    const fetchRealProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';
        const res = await fetch(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const dbUser = data.user;
          // Merge database data with defaults
          setProfileData(prev => ({
            ...prev,
            fullName: dbUser.fullName || dbUser.username || dbUser.name || prev.fullName,
            email: dbUser.email || prev.email,
            phone: dbUser.phone || prev.phone,
            location: dbUser.location || prev.location,
            profession: dbUser.profession || prev.profession,
            company: dbUser.company || prev.company,
            bio: dbUser.bio || prev.bio,
            website: dbUser.website || prev.website,
            github: dbUser.github || prev.github,
            linkedin: dbUser.linkedin || prev.linkedin,
            twitter: dbUser.twitter || prev.twitter,
            profileImage: dbUser.profileImage || prev.profileImage,
            joinDate: dbUser.joinDate || prev.joinDate
          }));
        }
      } catch (err) {
        console.error('Failed to fetch profile from DB', err);
      }
    };
    fetchRealProfile();
  }, []);

  const updateProfile = async (data: Partial<ProfileData>) => {
    // Optimistic UI update
    setProfileData(prev => ({ ...prev, ...data }));

    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';
      await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Failed to save profile to DB', err);
    }
  };

  const initializeProfile = (userData: { name?: string; email?: string }) => {
    // Maintain backwards compatibility if needed, though mostly handled by the fetch above
    if (userData.name || userData.email) {
      setProfileData(prev => ({
        ...prev,
        fullName: prev.fullName === DEFAULT_PROFILE.fullName && userData.name ? userData.name : prev.fullName,
        email: prev.email === DEFAULT_PROFILE.email && userData.email ? userData.email : prev.email
      }));
    }
  };

  const value = {
    profileData,
    updateProfile,
    initializeProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};
