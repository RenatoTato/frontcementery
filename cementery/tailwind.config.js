/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        vollkorn: ['Vollkorn SC', 'serif'],
      },
    },
  },
  plugins: [],
};