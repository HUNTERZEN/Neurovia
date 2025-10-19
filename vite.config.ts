import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Neurovia',
        short_name: 'Neurovia',
        description: 'Expert Tech Support Platform',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'map-vendor': ['@maptiler/sdk', 'react-map-gl'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    // ✅ ADD THIS: Allow ngrok and other tunnel domains
    allowedHosts: [
      'localhost',
      '.ngrok.io',
      '.ngrok-free.dev',
      '.ngrok.app',
      '.devtunnels.ms',
      '.loca.lt',
      '.tunnelmole.com'
    ],
    // 'disableHostCheck' is not a valid Vite option; host behavior is controlled via `host` and `allowedHosts`
    proxy: {
      // Proxy API calls to backend
      '/api': {
        target: 'http://localhost:8080', // Your backend server URL and port
        changeOrigin: true,
        secure: false
      }
    }
  }
});
