import tinycolor from "tinycolor2";

const theme = "#63AE8D";
const lightTheme = tinycolor(theme).lighten(35).toString();

export const colors = {
  theme,
  lightTheme,
  disabled: "#D1D1D1",
  background: {
    white: "#fff",
  },
  text: {
    primary: "white",
    secondary: "#483d8b",
    black: "black",
  },
};

export const image = {
  iconImg: 24,
};

export const fontSize = {
  header: 24,
  tab: 12,
};

export const spacing = {
  sm: 5,
  md: 10,
  lg: 20,
};
