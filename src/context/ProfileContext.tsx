import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

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
  updateProfile: (data: Partial<ProfileData>) => Promise<boolean>;
  initializeProfile: (userData: { name?: string; email?: string }) => void;
  isSaving: boolean;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const DEFAULT_PROFILE: ProfileData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  profession: '',
  company: '',
  joinDate: '',
  bio: '',
  website: '',
  github: '',
  linkedin: '',
  twitter: '',
  profileImage: '/api/placeholder/150/150'
};

const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data from backend on mount
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const dbUser = data.user;
        // Use DB values directly — don't fall back to hardcoded defaults
        setProfileData({
          fullName: dbUser.fullName || dbUser.username || dbUser.name || '',
          email: dbUser.email || '',
          phone: dbUser.phone ?? '',
          location: dbUser.location ?? '',
          profession: dbUser.profession ?? '',
          company: dbUser.company ?? '',
          bio: dbUser.bio ?? '',
          website: dbUser.website ?? '',
          github: dbUser.github ?? '',
          linkedin: dbUser.linkedin ?? '',
          twitter: dbUser.twitter ?? '',
          profileImage: dbUser.profileImage || '/api/placeholder/150/150',
          joinDate: dbUser.joinDate || new Date().getFullYear().toString()
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile from DB:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Save profile data to backend
  const updateProfile = async (data: Partial<ProfileData>): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No auth token found — cannot save profile');
      return false;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Profile save failed:', res.status, errData);
        return false;
      }

      const result = await res.json();
      // Update local state with the server response (source of truth)
      if (result.user) {
        const dbUser = result.user;
        setProfileData({
          fullName: dbUser.fullName || dbUser.username || '',
          email: dbUser.email || '',
          phone: dbUser.phone ?? '',
          location: dbUser.location ?? '',
          profession: dbUser.profession ?? '',
          company: dbUser.company ?? '',
          bio: dbUser.bio ?? '',
          website: dbUser.website ?? '',
          github: dbUser.github ?? '',
          linkedin: dbUser.linkedin ?? '',
          twitter: dbUser.twitter ?? '',
          profileImage: dbUser.profileImage || '/api/placeholder/150/150',
          joinDate: dbUser.joinDate || new Date().getFullYear().toString()
        });
      } else {
        // Fallback: optimistic update if server doesn't return user
        setProfileData(prev => ({ ...prev, ...data }));
      }

      return true;
    } catch (err) {
      console.error('Failed to save profile to DB:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const initializeProfile = useCallback((userData: { name?: string; email?: string }) => {
    if (userData.name || userData.email) {
      setProfileData(prev => ({
        ...prev,
        fullName: !prev.fullName && userData.name ? userData.name : prev.fullName,
        email: !prev.email && userData.email ? userData.email : prev.email
      }));
    }
  }, []);

  const value = {
    profileData,
    updateProfile,
    initializeProfile,
    isSaving,
    isLoading,
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
