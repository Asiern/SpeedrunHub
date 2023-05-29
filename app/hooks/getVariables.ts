import axios from "axios";
import { USER_AGENT } from "../constants/requests";
import { variablesResponse } from "./types";

export default async function getVariables(
  category: string
): Promise<variablesResponse> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/categories/${category}/variables`;
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
