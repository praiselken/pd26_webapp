/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        orange: ['"OrangeAvenue"', "serif"],
        orangeOutline: ['"OrangeAvenueOutline"', "serif"],
      },
    },
  },
  plugins: [],
};