/** @type {import('tailwindcss').Config} */
import tailwindTints from "tailwind-tints";
const tints = tailwindTints({
  primary: "#6f42c1",
  secondary: "#20c997",
  tertiary: "#808080",
  light: "#fffff0",
});

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        "bl-1": "0.4rem",
        "bl-2": "0.8rem",
        xxs: "1.6rem",
        xs: "2.4rem",
        sm: "3.2rem",
        md: "4rem",
        lg: "4.8rem",
        xl: "5.2rem",
        "2xl": "6rem",
        "3xl": "7.2rem",
      },
    },
  },
  plugins: [
    tints,
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
