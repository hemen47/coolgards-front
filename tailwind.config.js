/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '90': '22rem',
        '100': '28rem',
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
