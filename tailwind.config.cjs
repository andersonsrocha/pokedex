/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        strok: "strok 1.5s reverse",
        overlayShow: "overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },
      colors: {
        disabled: "rgb(255 255 255 / 0.08)",
        divide: {
          light: "#d9d9d9",
          dark: "#303030",
        },
        component: {
          light: "#ffffff",
          dark: {
            500: "#303030",
            600: "#232323",
          },
        },
        text: {
          light: "#355764",
          dark: "#ffffff",
        },
        hover: {
          light: "#f5f5f5",
          dark: "rgba(255, 255, 255, 0.08)",
        },
        primary: {
          400: "#f2d357",
          500: "#e6bc2f",
          600: "#bf941d",
        },
        secondary: {
          400: "#4d6870",
          500: "#355764",
          600: "#1d333d",
        },
        fire: {
          200: "#f8a060",
          500: "#f2751d",
        },
        water: {
          200: "#b2d9f2",
          500: "#549ede",
        },
        flying: {
          200: "#89BDFF",
          500: "#89bdff",
        },
        poison: {
          200: "#ffd6e7",
          500: "#f149ff",
        },
        grass: {
          200: "#b7eb8f",
          500: "#73d13d",
        },
        bug: {
          200: "#f4ffb8",
          500: "#7bcf00",
        },
        normal: {
          200: "#e0e3e5",
          500: "#9fa39d",
        },
        electric: {
          200: "#ffffb8",
          500: "#ffc53d",
        },
        ground: {
          200: "#fff1b8",
          500: "#ebd69d",
        },
        fairy: {
          200: "#ffd6e7",
          500: "#f759ab",
        },
        fighting: {
          200: "#ffd8bf",
          500: "#ff7a45",
        },
        dark: {
          200: "#fafafa",
          500: "#595959",
        },
        dragon: {
          200: "#d6e4ff",
          500: "#597ef7",
        },
        ghost: {
          200: "#efdbff",
          500: "#9254de",
        },
        ice: {
          200: "#b5f5ec",
          500: "#36cfc9",
        },
        psychic: {
          200: "#fff2f0",
          500: "#fa8581",
        },
        rock: {
          200: "#fcfbed",
          500: "#c9bb8a",
        },
        steel: {
          200: "#c9d6d6",
          500: "#79a8b0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        strok: {
          "100%": { "stroke-dashoffset": 400 },
        },
        "overlay-show": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "content-show": {
          "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
    fontFamily: {
      brand: ["Bahnschrift", "'Roboto Condensed'", "sans-serif"],
    },
  },
};
