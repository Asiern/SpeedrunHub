import { user } from "../hooks/types";
export type game = {
  id: string;
  abbreviation: string;
  uri: string;
};

export type config = {
  onboarding: boolean; // True if user completed onboarding
  // Logged user data
  user: user | null;
  logged: boolean; // True id logged in
  key: string | null; // API key
  // Notification fetching options
  notifications: {
    unread: boolean;
    push: boolean;
    max: number;
  };
  games: game[]; // Game list
  following: string[]; // User id's
  theme: theme;
};

export type theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    headerText: string;
    text: string;
    error: string;
  };
};
