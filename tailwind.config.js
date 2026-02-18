/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Crimson Text', 'Georgia', 'serif'],
        serif: ['Crimson Text', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#FFF9E6',
        beige: '#F4EDE0',
        slate: {
          DEFAULT: '#1a252f',  // Darker slate
          blue: '#1E3A5F',  // Deep slate blue
        },
        emerald: {
          DEFAULT: '#0F766E',
          dark: '#0D5F57',
          deep: '#064E3B',  // Deep emerald green
        },
        gold: {
          DEFAULT: '#C9A227',
          muted: '#D4B86A',
        },
        sage: '#A3BFA8',
      },
    },
  },
  plugins: [],
}
