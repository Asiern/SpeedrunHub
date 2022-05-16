export interface game {
  id: string;
  names: {
    international: string;
    japanese: string;
  };
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
}
