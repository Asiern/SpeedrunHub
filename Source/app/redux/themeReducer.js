import { lightTheme } from "../config/Themes";
import { darkTheme } from "../config/Themes";

import { SWITCH_THEME } from "./themeActions";

const initialState = {
  theme: darkTheme,
};
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };
    default:
      return state;
  }
};

export default themeReducer;
