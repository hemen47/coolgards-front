/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',

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
      },
      colors: {
        logo: '#00a2ea'
      },
      screens: {
        xs: '440px', // => @media (min-width: 440px)

        sm: '640px', // => @media (min-width: 640px)

        md: '768px', // => @media (min-width: 768px)

        lg: '1024px', // => @media (min-width: 1024px)

        xl: '1280px', // => @media (min-width: 1280px)

        '2xl': '1536px', // => @media (min-width: 1536px)

        '-2xl': { max: '1535px' }, // => @media (max-width: 1535px)

        '-xl': { max: '1279px' }, // => @media (max-width: 1279px)

        '-lg': { max: '1023px' }, // => @media (max-width: 1023px)

        '-md': { max: '767px' }, // => @media (max-width: 767px)

        '-sm': { max: '639px' }, // => @media (max-width: 639px)

        '-xm': { max: '440px' }, // => @media (max-width: 440px)
      },
    },
  },
  plugins: [
    require('preline/plugin'),

  ],
}
