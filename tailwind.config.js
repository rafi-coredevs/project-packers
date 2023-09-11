/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F2C852',
        secondary: '#0D3D4B'

      },
      fontSize: {
        '1.5/2': ["1.5rem", "2rem"]
      },
      content: {
        'arrowLeft': 'url(./src/assets/icons/cd-arrow-right-2.svg)',

      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        send: 'send .5s linear infinite',
        scale: 'scaleUp 5s ease-in-out infinite',
        loading: 'loading 1s ease-in-out infinite',
        coming: 'coming 8s ease-in-out infinite'
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'none',
          },
          '50%': {
            transform: 'scale(.9)'
          }
        },
        send: {
          '0 % ': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(200px, -200px)' },
          '50%': { transform: 'translate(0px, 200px)' },
          '75%': { transform: 'translate(-2px, 0px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        scaleUp: {
          '0%, 100%': {
            transform: 'none',
          },
          '50%': {
            transform: 'scale(6)'
          }
        },
        loading: {
          '0%, 100%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          }
        },
        coming: {
          '0%': {
            left: '-200%'
          },
          '50%': {
            left: '150%'
          },
          '100%': {
            left: '-200%'
          }
        }
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