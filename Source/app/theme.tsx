import { createText, createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    primary: "#FF8A65",
    light: "#ededed",
    white: "#fff",
    grey: "#f0f0f0",
    darkgrey: "#242c37",
    black: "#000",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export default theme;
