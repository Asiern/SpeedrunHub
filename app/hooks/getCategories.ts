import axios from "axios";
import { category } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getCategories(
  id: string
): Promise<{ data: category[] }> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/games/${id}/categories`;
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
