/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C89B3C', // Rich Gold
          dark: '#A67C2D',
          light: '#D4B46E',
        },
        secondary: {
          DEFAULT: '#0F172A', // Deep Black
          light: '#1E293B',
        },
        charcoal: '#111827',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
