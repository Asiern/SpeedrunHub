export interface run {
  id: string;
  weblink: string;
  game: string;
  category: string;
  level: null;
  videos: {
    text: string | null;
    links: link[];
  };
  comment: string;
  status: {
    status: string;
    examiner: string;
    "verify-date": string;
  };
  players: player[];
  date: string;
  submitted: string;
  times: {
    primary: string | null;
    primary_t: number | null;
    realtime: string | null;
    realtime_t: number | null;
    realtime_noloads: string | null;
    realtime_noloads_t: number | null;
    ingame: string | null;
    ingame_t: number | null;
  };
  system: {
    platform: string;
    emulated: boolean;
    region: string | null;
  };
  splits: null | split;
}
interface link {
  uri: string;
}
interface player {
  rel: string;
  id: string;
  uri: string;
}
interface split {
  rel: string;
  uri: string;
}
