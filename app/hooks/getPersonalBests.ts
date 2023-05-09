import axios from "axios";
import { personalBest } from "./types";

export default async function getPersonalBests(
  userid: string
): Promise<personalBest[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `https://www.speedrun.com/api/v1/users/${userid}/personal-bests?embed=game,category`;
      axios({ method: "GET", url }).then((response) => {
        resolve(response.data.data as personalBest[]);
      });
    } catch (e) {
      reject();
    }
  });
}
