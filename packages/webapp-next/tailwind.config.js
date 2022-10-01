/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {},
  plugins: [],
  theme: {
    top: {
      "1/2": "50%",
    },
    left: {
      "1/2": "50%",
    },
    inset: {
      0: 0,
      auto: "auto",
      "1/2": "50%",
    },
    extend: {
      colors: {
        citrus: "#F5CBA7",
        "off-white": "#eeeeee",
        "dark-ocean": "#0E0E11",
        "dark-lake": "#18181b",
        code: "#f5f2f0;",
      },
      width: {
        "1/2": "50%",
        680: "680px",
        340: "340px",
        632: "632px",
        450: "450px",
        300: "300px",
      },
      width: {
        680: "680px",
        340: "340px",
        632: "632px",
        450: "450px",
        300: "300px",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1900px",
      },
      boxShadow: {
        "highlight-menu": "3px 0 0 0 #0ba90b inset",
      },
    },
  },
};
