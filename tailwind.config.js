const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        appTheme: {
          primary: '#30784C',
          secondary: '#D0ECE9',
          accent: '#D0ECE9',
          neutral: '#191A3E',
          'base-100': '#F5FBF4',
          info: '#CAE2E8',
          success: '#DFF2A1',
          warning: '#F7E488',
          error: '#F2B6B5',
        },
      },
    ],
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('daisyui'),
  ],
}
