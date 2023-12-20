import axios from "axios";
import { leaderboardResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

export type selectedVariables = { [key: string]: string };

export default async function getLeaderboard(
  game: string,
  category: string,
  variables?: selectedVariables
): Promise<leaderboardResponse> {
  return new Promise((resolve, reject) => {
    if (category === "" || game === "") return;
    let url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players`;
    if (variables !== undefined) {
      url += "&";
      const numVars = Object.keys(variables).length;
      Object.keys(variables).map((variable, i) => {
        url += `var-${variable}=${variables[variable]}`;
        if (i !== numVars - 1) url += "&";
      });
    }

    console.log(url);

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
