import axios from "axios";
import { run } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getRuns(
  userid: string | null
  // TODO guest: string | null
): Promise<run[]> {
  const endpoint = `https://www.speedrun.com/api/v1/runs?user=${userid}`;

  const { data } = await axios({
    url: endpoint,
    method: "GET",
    headers: { "User-Agent": USER_AGENT },
  });

  return data.data as run[];
}
