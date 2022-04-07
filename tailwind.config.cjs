module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['roboto', 'sans-serif']
      },
      colors: {
        background: "#202124",
        foreground: "#292A2D",
        strongtext: "#E8EAED",
        lighttext: "#9AA0A6",
        strongborder: "rgba(255, 255, 255, 0.1)",
        lightborder: "#5F6368",
        twitch: "#6441A5",
        lightforeground: "rgba(0, 0, 0, 0.05)",
        lightbackground: "#fff",
        lightstrongtext: "#030303",
        lightlighttext: "#606060"

      }
    },
  },
  plugins: [],
}
