/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deepPlum: "#522888",
          darkPlum: "#3B1B64",
          lightPlum: "#5E2C91",
          lavender: "#8C7A9A",
        },
        secondary: {
          softGold: "#BF9553",
          champagneGold: "#D4AF37",
          darkGold: "#9A7843",
          paleGold: "#E8D4A0",
        },
      },
    },
  },
  plugins: [],
}
