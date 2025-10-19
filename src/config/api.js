// src/config/api.js
const getAPIBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VITE_API_BASE_URL || 'https://your-production-api.com';
  }
  
  // Development: Auto-detect if we're on mobile
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  } else {
    // Mobile access via IP
    return `http://${hostname}:8080`;
  }
};

export const API_BASE_URL = getAPIBaseURL();
export default API_BASE_URL;
