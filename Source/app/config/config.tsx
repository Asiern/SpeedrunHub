import { createContext } from "react";

export const context = createContext(null);

export const config = {
  onboarding: false,
  user: {
    logged: false,
    username: null,
    userid: null,
    key: null,
  },
  notifications: {
    push: false,
    max: 20,
  },
  games: [],
};
