export interface category {
  id: string;
  name: string;
  weblink: string;
  type: string;
  rules: string;
  players: {
    type: string;
    value: number;
  };
  miscellaneous: boolean;
  links: link[];
}
interface link {
  rel: string;
  uri: string;
}
