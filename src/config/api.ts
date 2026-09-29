// src/config/api.ts
const getAPIBaseURL = (): string => {
  const hostname = window.location.hostname;
  
  // 1. Check for Production (Vercel)
  if (hostname.includes('vercel.app') || hostname.includes('neurovia-tech-support')) {
    return window.location.origin;
  }

  // 2. Check for public tunnels
  if (
    hostname.includes('ngrok') || 
    hostname.includes('devtunnels') || 
    hostname.includes('loca.lt') ||
    hostname.includes('tunnelmole') ||
    hostname.includes('trycloudflare')
  ) {
    return window.location.origin;
  }
  
  // 3. Fallback for Local Development / Render Backend
  return (import.meta as any).env?.VITE_API_URL || 'https://neurovia-backend.onrender.com';
};

export const API_BASE_URL: string = getAPIBaseURL();
export default API_BASE_URL;
