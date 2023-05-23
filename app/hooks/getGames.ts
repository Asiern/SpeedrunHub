import axios from "axios";
import { gamesResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getGames(
  query: string,
  pagination = 20
): Promise<gamesResponse> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/games?name=${query}&max=${pagination}`;
    try {
      axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } }).then(
        ({ data }) => {
          resolve(data as gamesResponse);
        }
      );
    } catch (e) {
      console.warn(e);
      reject(e);
    }
  });
}
