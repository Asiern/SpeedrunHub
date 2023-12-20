import axios from "axios";
import { categoryResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

export default async function getCategory(
  id: string
): Promise<categoryResponse> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/categories/${id}`;
    axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } })
      .then((response) => {
        resolve(response.data as categoryResponse);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
