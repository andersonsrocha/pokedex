/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        shake: "shake 0.5s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
          "1%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
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
    },
  },
  plugins: [],
};
