const getAPIBaseURL = () => {
  const hostname = window.location.hostname;
  
  // 1. Check for Production (Vercel)
  // If we are on your Vercel domain, use the same origin 
  // (Your vercel.json rewrite will handle the rest)
  if (hostname.includes('vercel.app')) {
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
  // If you are on localhost, talk to Render so you don't have to run the server locally
  return import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';
};

export const API_BASE_URL = getAPIBaseURL();
export default API_BASE_URL;