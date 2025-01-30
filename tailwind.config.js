/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': {
          100: '#E6F0FF',
          500: '#89C4F4',
          600: '#6BB1E3',
        },
        'pastel-green': {
          100: '#E6FCE6',
          500: '#A8E6A3',
          600: '#7ACB78',
        },
        'pastel-yellow': {
          100: '#FFF9E6',
          500: '#FCE79A',
          600: '#F4D35E',
        },
        'pastel-orange': {
          100: '#FFEFE6',
          500: '#F8C19A',
          600: '#F4A261',
        },
        'pastel-pink': {
          100: '#FFE6F0',
          500: '#F4A8C4',
          600: '#E37A99',
        },
        'pastel-purple': {
          100: '#F3E6FF',
          500: '#C4A8F4',
          600: '#A37AE3',
        },
        'pastel-red': {
          100: '#FFE6E6',
          500: '#F4A8A8',
          600: '#E37A7A',
        },
      },
    },
  },
  plugins: [],
}

