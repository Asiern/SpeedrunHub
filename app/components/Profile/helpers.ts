export interface SectionsProps {
  data: Section[];
  pagination: string[];
}
interface Section {
  abbreviation: string;
  data: SectionData[];
  id: string;
  name: string;
  uri: string | null;
}
interface SectionData {
  key: string;
  category: string;
  place: string;
  runnerid: string;
  time: string;
  weblink: string;
  misc: boolean;
}

export interface user {
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
  assets: {
    icon: {
      uri: string | null;
    };
    image: {
      uri: string | null;
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
