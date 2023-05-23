import axios from "axios";
import { personalBest } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getPersonalBests(
  userid: string
): Promise<personalBest[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `https://www.speedrun.com/api/v1/users/${userid}/personal-bests?embed=game,category`;
      axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } }).then(
        (response) => {
          resolve(response.data.data as personalBest[]);
        }
      );
    } catch (e) {
      reject();
    }
  });
}
