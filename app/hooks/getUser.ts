import axios from "axios";
import { userResponse } from "./types";
import { user } from "./types";
import { USER_AGENT } from "../constants/requests";

/**
 * Get user info from api
 * @param username
 * @returns User object
 */
export default async function getUser(username: string): Promise<user> {
  const endpoint = `https://www.speedrun.com/api/v1/users/${username}`;
  const response = await axios({
    url: endpoint,
    method: "GET",
    headers: { "User-Agent": USER_AGENT },
  });
  const { data } = response.data as userResponse;
  return data;
}
