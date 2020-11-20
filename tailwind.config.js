module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#6B9080",
      primary1: "#6B9080",
      secondary: "#D68C45",
      secondary2: "#D68C45",
      accent: "#FEFEE3",
      light: "#F6FFF8",
      dark: "#122B1D",
      white1: "#fff",
      gray: {
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
    },
    extend: {},
  },
  variants: {
    cursor: ["responsive", "hover", "focus"],
    borderColor: ["responsive", "hover", "focus", "focus-within"],
    borderWidth: ["responsive", "hover", "focus", "focus-within"],
    backgroundColor: ["hover", "focus", "active", "focus-within"],
    textColor: ["responsive", "hover", "focus", "active", "group-focus"],
    fontSize: ["responsive", "hover", "focus", "active", "group-focus"],
    borderStyle: ["responsive", "hover", "focus", "active", "group-focus"],
    extend: {},
  },
  plugins: [],
};
