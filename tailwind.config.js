/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./complete-dbt.html",
    "./template.html",
    "./modules/*.html",
    "./thinking-traps/*.html",
    "./tools/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9333EA',
        'primary-light': '#A855F7',
        'primary-dark': '#7E22CE',
        secondary: '#4F46E5',
        dark: '#0f172a',
        'dark-lighter': '#1e293b'
      }
    }
  },
  plugins: []
} 