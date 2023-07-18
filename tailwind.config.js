/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
});
