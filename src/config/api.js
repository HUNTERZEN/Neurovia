// src/config/api.js
const getAPIBaseURL = () => {
  const hostname = window.location.hostname;
  const envUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

  if (
    hostname.includes('vercel.app') ||
    hostname.includes('neurovia-tech-support') ||
    hostname.includes('neurovia.site')
  ) {
    if (envUrl && envUrl.startsWith('https://')) {
      return envUrl;
    }
    return window.location.origin;
  }

  if (
    hostname.includes('ngrok') ||
    hostname.includes('devtunnels') ||
    hostname.includes('loca.lt') ||
    hostname.includes('tunnelmole') ||
    hostname.includes('trycloudflare')
  ) {
    return window.location.origin;
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return envUrl || 'http://localhost:8080';
  }

  return envUrl && !envUrl.includes('localhost')
    ? envUrl
    : 'https://neurovia-backend.onrender.com';
};

export const API_BASE_URL = getAPIBaseURL();
export default API_BASE_URL;
