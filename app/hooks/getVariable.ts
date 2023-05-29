import axios from "axios";
import { USER_AGENT } from "../constants/requests";

export default async function getVariable(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `https://www.speedrun.com/api/v1/vairables/${id}`;
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
