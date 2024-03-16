/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#008080",
          secondary:"#ff1cae",
          threy:"#673AB7",
          frey: "#ba3809",
          mrey:"#ba3809",
          yuva:"#2e003e"
        },
      },
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  }