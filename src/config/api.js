// src/config/api.js
const getAPIBaseURL = () => {
  const hostname = window.location.hostname;
  
  // For public tunnels, use same origin (proxy will handle it)
  if (hostname.includes('ngrok') || 
      hostname.includes('devtunnels') || 
      hostname.includes('loca.lt') ||
      hostname.includes('tunnelmole') ||
      hostname.includes('trycloudflare')) {
    return window.location.origin;
  }
  
  // Local development
  return 'http://localhost:8080';
};

export const API_BASE_URL = getAPIBaseURL();
export default API_BASE_URL;
