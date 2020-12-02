module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      primary: "#A50104",
      "primary-1": "#FFCECF",
      secondary: "#FCBA04",
      "secondary-1": "#FEEBB7",
      tertiary: "#590004",
      accent: "#FEFEE3",
      positive: "#01A76D",
      light: "#edf2f4",
      dark: "#250001",
      white: "#fff",
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
      "smoke-darkest": "rgba(0, 0, 0, 0.9)",
      "smoke-darker": "rgba(0, 0, 0, 0.75)",
      "smoke-dark": "rgba(0, 0, 0, 0.6)",
      smoke: "rgba(0, 0, 0, 0.5)",
      "smoke-light": "rgba(0, 0, 0, 0.4)",
      "smoke-lighter": "rgba(0, 0, 0, 0.25)",
      "smoke-lightest": "rgba(0, 0, 0, 0.1)",
    },
    extend: {},
  },
  variants: {
    cursor: ["responsive", "hover", "focus"],
    margin: ["first", "last"],
    padding: ["first", "last"],
    borderRadius: ["first", "last"],
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
