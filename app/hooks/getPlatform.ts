import axios from "axios";
import { platformsResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getPlatform(
  id: string
): Promise<platformsResponse> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/platforms/${id}`;
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
