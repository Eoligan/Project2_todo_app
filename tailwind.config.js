/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      averia: {
        DEFAULT: "averia_serif_libreregular",
        bold_italic: "averia_serif_librebold_italic",
        italic: "averia_serif_libreitalic",
        light: "averia_serif_librelight",
        light_italic: "averia_serif_libreLtIt",
        bold: "averia_serif_librebold",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "hsl(36.1,66%,48.4%, <alpha-value>)", //#cd8c2a
          100: "hsl(36.1,65.8%,63.3%, <alpha-value>)",
          200: "hsl(36,66%,58.4%, <alpha-value>)",
          300: "hsl(35.9,66.2%,53.5%,<alpha-value>)",
          500: "hsl(36.2,65.8%,43.5%, <alpha-value>)",
          600: "hsl(36,66.3%,38.4%, <alpha-value>)",
          700: "hsl(36.1,66.1%,33.5%, <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(254.1,84.2%,19.8%, <alpha-value>)", //#1c085d
          100: "hsl(254.1,84.2%,34.7%, <alpha-value>)",
          200: "hsl(254.1,84.2%,29.8%, <alpha-value>)",
          300: "hsl(254.2,84.1%,24.7%, <alpha-value>)",
          500: "hsl(254.1,84.2%,14.9%, <alpha-value>)",
          600: "hsl(254.3,84%,9.8%, <alpha-value>)",
          700: "hsl(254.3,84%,4.9%, <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
}
