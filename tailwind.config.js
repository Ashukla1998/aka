module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* ================= FONTS ================= */
      fontFamily: {
        sans: ["Poppins", "sans-serif"],   // default UI + labels
        serif: ["Poppins", "sans-serif"],  // headings (keeps your existing usage)
        body: ["Roboto", "sans-serif"],    // paragraphs / long text
      },

      /* ================= COLORS ================= */
      colors: {
        arcadisOrange: "#E85C0D",
        arcadisGold: "#C5A879",
        arcadisGray: "#6B6E73",
        arcadisDark: "#1C1C1C",
      },

      /* ================= LETTER SPACING ================= */
      letterSpacing: {
        arcadis: "0.3em",
      },

      /* ================= KEYFRAMES ================= */
      keyframes: {
        logoIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "40%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },

        lineGrow: {
          "0%": { width: "0" },
          "100%": { width: "90px" },
        },

        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* ================= ANIMATIONS ================= */
      animation: {
        logoIn: "logoIn 1.2s ease-out forwards",
        lineGrow: "lineGrow 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
