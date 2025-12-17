module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        arcadisOrange: "#E85C0D",
        arcadisGold: "#C5A879",
        arcadisGray: "#6B6E73",
        arcadisDark: "#1C1C1C",
      },
      letterSpacing: {
        arcadis: "0.3em",
      },
    },
  },
  plugins: [],
};
