/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg-color': '#F4F4F4',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({addCommonColors: true})]
};
