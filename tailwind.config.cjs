/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    colors: {
      black: "#333333",
      white: "#F7F7F7",
      orange: "#FA8816",
      peach: "#FFF0E5",
    },
    fontFamily: {
      header: "Apfel Grotezk, sans-serif",
      base: "Satoshi, sans-serif",
    },
    extend: {},
  },
  plugins: [],
};
