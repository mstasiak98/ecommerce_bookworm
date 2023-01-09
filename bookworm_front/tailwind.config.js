/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          red: {
            light: '#f75454',
            strong: '#f30b0b'
          },
          gray: {
            light: '#eae8e4'
          }
        }
      }
    },
  },
  plugins: [],
}
