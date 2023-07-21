/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#062428',
        opalblue: '#44bdbe',
      },
      fontFamily: {
        luckiest: ['Luckiest Guy'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#030C11',
          'base-100': '#FFFFFF',
          info: '#2B9EB3',
          success: '#44AF69',
          warning: '#FCAB10',
          error: '#D81E5B',
        },
      },
    ],
  },
});
