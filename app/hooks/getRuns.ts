import axios from "axios";
import { run } from "./types";

export default async function getRuns(
  userid: string | null
  // TODO guest: string | null
): Promise<run[]> {
  const endpoint: string = `https://www.speedrun.com/api/v1/runs?user=${userid}`;

  const { data } = await axios({
    url: endpoint,
    method: "GET",
  });

  return data.data as run[];
}
