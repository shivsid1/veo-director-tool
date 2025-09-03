/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'video-black': '#0a0a0a',
        'video-gray': '#1a1a1a', 
        'video-accent': '#ff6b35',
        'video-gold': '#f7931e'
      }
    },
  },
  plugins: [],
}