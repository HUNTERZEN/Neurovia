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
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('neurovia-profile-data');
    if (saved) {
      try {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      } catch (error) {
        console.error('Error parsing saved profile data:', error);
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('neurovia-profile-data', JSON.stringify(updated));
      return updated;
    });
  };

  const initializeProfile = (userData: { name?: string; email?: string }) => {
    if (userData.name || userData.email) {
      const updates: Partial<ProfileData> = {};
      if (userData.name && userData.name !== profileData.fullName) {
        updates.fullName = userData.name;
      }
      if (userData.email && userData.email !== profileData.email) {
        updates.email = userData.email;
      }
      if (Object.keys(updates).length > 0) {
        updateProfile(updates);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('neurovia-profile-data', JSON.stringify(profileData));
  }, [profileData]);

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
