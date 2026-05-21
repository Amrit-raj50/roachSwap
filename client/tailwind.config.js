export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        roach: {
          green:        "#1D9E75",
          "green-light": "#E1F5EE",
          "green-dark":  "#0F6E56",
          purple:       "#534AB7",
          "purple-light":"#EEEDFE",
          amber:        "#BA7517",
          "amber-light": "#FAEEDA",
          coral:        "#D85A30",
          "coral-light": "#FAECE7",
          ink:          "#2C2C2A",
          muted:        "#888780",
          surface:      "#F1EFE8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
