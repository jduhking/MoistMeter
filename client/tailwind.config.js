/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brdr-color": "#428FFC",
        "brdr-color-30": "#428FFC20",
        "brdr-color-40": "#428FFC40",
        "brdr-color-50": "#428FFC50",
        "brdr-color-60": "#428FFC60",
        "text-color": "#428FFC",
      },
    },
  },
  plugins: [],
};
