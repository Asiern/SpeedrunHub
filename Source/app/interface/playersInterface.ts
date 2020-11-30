export interface player {
  rel: string;
  id: string;
  names: {
    international: string;
    japanese: string;
  };
  weblink: string;
  role: string;
  signup: string;
  location: {
    country: {
      code: string;
      names: {
        international: string;
        japanese: string;
      };
    };
  };
  twitch: link | null;
  twitter: link | null;
  hitbox: link | null;
  youtube: link | null;
  speedrunslive: link | null;
  links: links[];
}
interface link {
  uri: string;
}
interface links {
  rel: string;
  uri: string;
}
