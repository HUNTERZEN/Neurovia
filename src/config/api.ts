// src/config/api.ts
const getAPIBaseURL = (): string => {
  const hostname = window.location.hostname;
  const envUrl = ((import.meta as any).env?.VITE_API_URL || '').trim().replace(/\/+$/, '');

  // 1. Production domains using Vercel rewrites (same-origin /api/*)
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

  // 2. Public dev tunnels
  if (
    hostname.includes('ngrok') ||
    hostname.includes('devtunnels') ||
    hostname.includes('loca.lt') ||
    hostname.includes('tunnelmole') ||
    hostname.includes('trycloudflare')
  ) {
    return window.location.origin;
  }

  // 3. Local development (never accidentally point production hostnames to localhost)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return envUrl || 'http://localhost:8080';
  }

  return envUrl && !envUrl.includes('localhost')
    ? envUrl
    : 'https://neurovia-backend.onrender.com';
};

export const API_BASE_URL: string = getAPIBaseURL();
export default API_BASE_URL;
