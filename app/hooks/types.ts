export type notification = {
  created: string;
  id: string;
  item: null;
  links: string[];
  status: "unread" | "read" | string;
  text: string;
};

export type notificationResponse = {
  data: notification[];
  pagination: { links: null; max: number; offset: number; size: number };
};

type names = {
  international: string;
  japanese: string;
};

export type game = {
  id: string;
  names: names;
  abbreviation: string;
  released: number;
  "release-date": string;
  weblink: string;
  platforms: string[];
  ruleset: {
    "show-milliseconds": boolean;
    "require-verification": boolean;
    "require-video": boolean;
    "run-times": string[];
    "default-time": string;
    "emulators-allowed": boolean;
  };
};

type link = { rel: string; uri: string };
export type socialMedia = { uri: string };

type color = { light: string; dark: string };
type style = "gradient" | "solid";

type location = {
  country: {
    code: string;
    names: names;
  };
};

type pagination = {
  offset: number;
  max: number;
  size: number;
  links: link[];
};

export type user = {
  id: string;
  names: {
    international: string | null;
    japanese: string | null;
  };
  supporterAnimation: boolean;
  pronouns: null;
  weblink: string;
  "name-style": {
    style: style;
    color: color | null;
    "color-from": color | null;
    "color-to": color | null;
  };
  role: "banned" | "user" | "trusted" | "moderator" | "admin" | "programmer";
  signup: string | null;
  location: location | null;
  links: link[];
  twitch: socialMedia | null;
  hitbox: socialMedia | null;
  youtube: socialMedia | null;
  twitter: socialMedia | null;
  speedrunslive: socialMedia | null;
  assets: {
    icon: { uri: string | null };
    image: { uri: string | null };
    supporterIcon: string | null;
  };
};

export type userResponse = {
  data: user;
};

export type usersResponse = {
  data: user[];
  pagination: pagination;
};

export type runsResponse = {
  data: run[];
};

type player = {
  rel: "user" | "guest";
  name?: string;
  id?: string;
  uri: string;
};

export type run = {
  id: string;
  weblink: string;
  game: string;
  level: null;
  category: string;
  status: {
    status: "new" | "verified" | "rejected";
    examiner?: string;
    "verify-date"?: string | null;
    reason?: string;
  };
  players: player[];
  date: string | null;
  submitted: string | null;
  times: {
    primary: string;
    primary_t: number;
    realtime?: string;
    realtime_t?: number;
    realtime_noloads?: string;
    realtime_noloads_t?: number;
    ingame?: string;
    ingame_t?: number;
  };
  system: {
    platform: string;
    emulated: boolean;
    region: string | null;
  };
  values: Object;
  videos: {
    text?: string;
    links: { uri: string }[];
  } | null;
  splits: { rel: string; uri: string } | null;
};
