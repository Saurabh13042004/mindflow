/** @type {import('tailwindcss').Config} */
import prelinePlugin from 'preline/plugin';
import tailgridsPlugin from 'tailgrids/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Use class-based dark mode instead of system preference
  plugins: [
    prelinePlugin,
    tailgridsPlugin,
  ],
};