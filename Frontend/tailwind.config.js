/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'], // Adding the Inter font
        },
        colors: {
          grey : "#787486",
          bgGrey : "#F5F5F5"
          // Add more colors as needed
        },
      },
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
    style: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  }
  
   