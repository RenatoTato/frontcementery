/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      minHeight: {
        '30vh': '30vh', // Altura personalizada para las secciones con c9
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        vollkorn: ['Vollkorn SC', 'serif'],
      },
    },
  },
  plugins: [],
};