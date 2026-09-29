/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#4caf50',
          greenDark: '#388e3c',
          greenAccent: '#67ad5b',
          slateLight: '#f4f4f5',
          charcoal: '#222222',
          darkBg: '#0a0a0a',
          mediumBg: '#1a1a1a',
        },
      },
      animation: {
        kenburns: 'kenburns 20s ease-in-out infinite alternate',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};