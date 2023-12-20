import axios from "axios";
import { gameResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getGame(id: string): Promise<gameResponse> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/games/${id}`;
    axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
