import { createContext } from "react";
import { Theme } from "../themes/DefaultTheme";
import { config } from "../types";

// Default config
export const defaultConfig: config = {
  onboarding: false,
  logged: false,
  user: null,
  key: null,
  notifications: {
    unread: false,
    push: false,
    max: 20,
  },
  games: [],
  theme: Theme,
};

export type configCtx = {
  config: config;
  setConfig: (config: config) => Promise<void>;
};

// Define context
export const context = createContext<configCtx | undefined>(undefined);
