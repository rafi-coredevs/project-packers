/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : '#F2C852',
        secondary: '#0D3D4B'
        
      },
      content:{
        'arrowLeft': 'url(./src/assets/icons/cd-arrow-right-2.svg)'
      }
    },
    fontFamily: {
      'sans': ['Plus Jakarta Sans', "sans-serif"],
      'sora': ['Sora', "sans-serif"],
      'inter': ['Inter', 'sans-serif']
    }
  },
  plugins: [],
}
