import { TextStyle } from "react-native";

export const shadow = {
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 1,
  elevation: 5,
  shadowColor: "black",
};

export const colors = {
  primary: "#FF8A65",
  light: "#ededed",
  white: "#fff",
  grey: "#f0f0f0",
  darkgrey: "#242c37",
  black: "#000",
};

export const h1: TextStyle = {
  color: colors.darkgrey,
  fontSize: 30,
  fontWeight: "bold",
};
export const h2: TextStyle = {
  color: colors.darkgrey,
  fontSize: 25,
  fontWeight: "bold",
};
export const h2w: TextStyle = {
  color: colors.white,
  fontSize: 25,
  fontWeight: "bold",
};
export const h3: TextStyle = {
  color: colors.white,
  fontSize: 20,
  fontWeight: "bold",
};
export const h3w: TextStyle = {
  color: colors.white,
  fontSize: 20,
  fontWeight: "bold",
};
export const h4: TextStyle = {
  color: colors.darkgrey,
  fontSize: 17,
};
export const h4w: TextStyle = {
  color: colors.white,
  fontSize: 17,
};
export const h4p: TextStyle = {
  color: colors.primary,
  fontSize: 17,
};
