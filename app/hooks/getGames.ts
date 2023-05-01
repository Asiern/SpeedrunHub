import axios from "axios";
import { gameResponse } from "./types";

export default async function getGames(query: string): Promise<gameResponse> {
  return new Promise((resolve, reject) => {
    const url: string = `https://www.speedrun.com/api/v1/games?name=${query}`;
    try {
      axios({ method: "GET", url }).then(({ data }) => {
        resolve(data as gameResponse);
      });
    } catch (e) {
      console.warn(e);
      reject(e);
    }
  });
}
