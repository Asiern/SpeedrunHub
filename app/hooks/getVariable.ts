import axios from "axios";
import { USER_AGENT } from "../constants/requests";
import { variable } from "./types";

export default async function getVariable(id: string): Promise<variable> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/variables/${id}`;
    axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } })
      .then((response) => {
        console.log(response.data.data);
        resolve(response.data.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
