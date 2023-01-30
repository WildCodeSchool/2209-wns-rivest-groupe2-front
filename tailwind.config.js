/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#062428',
      },
      fontFamily: {
        luckiest: ['Luckiest Guy']
      }
    },
  },
  plugins: [],
});
