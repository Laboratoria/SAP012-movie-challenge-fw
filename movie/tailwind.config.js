/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'bd-background': '#040714',
        'bd-header': '#0E1428',
        'bd-text-white-50': '#EFE6E6',
        'bd-red-100': '#DFCCCC',
        'bd-red-500': '#E5382A ',
      },
    },
  },
  plugins: [],
}
