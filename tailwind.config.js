const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('daisyui'),
  ],
}
