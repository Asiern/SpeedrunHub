import axios from "axios";
import { PersonalBest } from "./types";

export default async function getPersonalBests(
  userid: string
): Promise<PersonalBest[]> {
  return new Promise((resolve, reject) => {
    try {
      const url: string = `https://www.speedrun.com/api/v1/users/${userid}/personal-bests?embed=game,category`;
      axios({ method: "GET", url }).then((response) => {
        console.log(response.data.data[0]);
        resolve(response.data.data as PersonalBest[]);
      });
    } catch (e) {
      reject();
    }
  });
}
