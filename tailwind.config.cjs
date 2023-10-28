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
      peach: "#FFDEC7",
    },
    fontFamily: {
      header: "Firs Neue, sans-serif",
      base: "Aeonik Fono, sans-serif",
    },
    extend: {},
  },
  plugins: [],
};
