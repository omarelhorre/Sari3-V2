/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Green color for hospital theme (from guide)
        secondary: '#2E7D32',
        accent: '#43A047',
        background: '#F5F7FA',
        text: '#4D4D4D',
      },
    },
  },
  plugins: [],
}

