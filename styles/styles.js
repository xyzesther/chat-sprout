import tinycolor from "tinycolor2";

const theme = "#63AE8D";
const lightTheme = tinycolor(theme).lighten(35).toString();

export const colors = {
  theme,
  lightTheme,
  disabled: "#D1D1D1",
  background: {
    white: "#fff",
    transparent: "rgba(0, 0, 0, 0)",
    modal: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    primary: "white",
    secondary: "#63AE8D",
    black: "black",
  },
  icon: {
    primary: "#63AE8D",
    black: "black",
    unfocused: "darkgray",
  },
};

export const image = {
  iconImg: 24,
  buttonImg: 60,
  thumbnail: 100,
};

export const fontSize = {
  header: 24,
  tab: 12,
  body: 16,
};

export const spacing = {
  xs: 2,
  sm: 5,
  md: 10,
  lg: 20,
  xl: 30,
};

export const borderRadius = {
  sm: 2,
  md: 5,
  lg: 10,
  xl: 30,
};

export const borderWidth = {
  null: 0,
  sm: 1,
  md: 2,
  lg: 3,
};
  
