/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brdr-green": "#4DA167",
        "brdr-green-30": "#4DA16720",
        "brdr-green-40": "#4DA16740",
        "brdr-green-50": "#4DA16750",
        "brdr-green-60": "#4DA16760",
        "text-green": "#4DA167",
        stupid: "#ff0000",
      },
    },
  },
  plugins: [],
};
