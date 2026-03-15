// src/config/api.js
const getAPIBaseURL = () => {
  const hostname = window.location.hostname;
  
  // 1. Check for Production (Vercel)
  // This now includes both your unique Vercel subdomains and your specific project domain
  if (hostname.includes('vercel.app') || hostname.includes('neurovia-tech-support')) {
    // When on Vercel, we use the same origin so vercel.json rewrites can work
    return window.location.origin;
  }

  // 2. Check for public tunnels
  if (hostname.includes('ngrok') || 
      hostname.includes('devtunnels') || 
      hostname.includes('loca.lt') ||
      hostname.includes('tunnelmole') ||
      hostname.includes('trycloudflare')) {
    return window.location.origin;
  }
  
  // 3. Fallback for Local Development
  // Defaults to your live Render backend so you can develop without running a local DB
  return import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';
};

export const API_BASE_URL = getAPIBaseURL();
export default API_BASE_URL;