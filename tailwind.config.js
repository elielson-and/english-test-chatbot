/** @type {import('tailwindcss').Config} */
import tailwindAnimated from "tailwindcss-animated";
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      xxs: '0.55rem'
    }
  },
  plugins: [
    tailwindAnimated
  ],
}

