type social = { name: string; icon: string; uri: string };
export type user = {
  username: string | null;
  userid: string | null; // User identifier
  key: string | null; // speedrun.com API-Key
  image: string | null; // Url to user image at speedrun.com
  location: {
    country: {
      code: string;
      names: { international: string | null; japanese: string | null };
      flag: {
        uri: string | null;
      };
    };
  } | null;
  social: social[];
};

export type game = {
  id: string;
  abbreviation: string;
  uri: string;
};

export type config = {
  onboarding: boolean; // True if user completed onboarding
  // Logged user data
  user: user;
  logged: boolean; // True id logged in
  // Notification fetching options
  notifications: {
    unread: boolean;
    push: boolean;
    max: number;
  };
  games: game[]; // Game list
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
