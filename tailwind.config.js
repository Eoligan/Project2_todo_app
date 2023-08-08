/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "hsl(36.1,66%,48.4%, <alpha-value>)", //#cd8c2a
        secondary: "hsl(254.1,84.2%,19.8%, <alpha-value>)",//#1c085d
      },
    },
  },
  plugins: [],
}
