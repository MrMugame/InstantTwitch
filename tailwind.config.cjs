module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['roboto', 'sans-serif']
      },
      colors: {
        background: "#202124",
        foreground: "#292A2D",
        strongtext: "#E8EAED",
        lighttext: "#9AA0A6",
        strongborder: "rgba(255, 255, 255, 0.1)",
        lightborder: "#5F6368",
        twitch: "#6441A5"
      }
    },
  },
  plugins: [],
}
