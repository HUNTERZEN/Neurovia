/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B46C1',
          dark: '#553C9A',
          light: '#9F7AEA',
        },
        accent: {
          blue: {
            dark: '#2B6CB0',
            light: '#63B3ED',
          },
        },
      },
    },
  },
  plugins: [],
} 