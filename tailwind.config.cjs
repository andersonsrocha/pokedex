/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        zoomIn: "zoomIn .5s both",
      },
      keyframes: {
        zoomIn: {
          "0%": { opacity: 0, transform: "scale3d(.3,.3,.3)" },
          "50%": { opacity: 1 },
        },
      },
    },
    fontFamily: {
      brand: ["Bahnschrift SemiBold"],
    },
    colors: {
      white: "#ffffff",
      red: "#f5222d",
      yellow: "#fadb14",
      green: "#52c41a",
      divide: "rgb(255 255 255 / 0.2)",
      disabled: "rgb(255 255 255 / 0.08)",
      brand: {
        100: "#313131",
        500: "#232323",
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
  },
  plugins: [],
};
