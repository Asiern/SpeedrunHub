import axios from "axios";
import { userResponse } from "./types";
import { user } from "./types";

/**
 * Get user info from api
 * @param username
 * @returns User object
 */
export default async function getUser(username: string): Promise<user> {
  const endpoint: string = "https://www.speedrun.com/api/v1/users/" + username;
  const response = await axios({ url: endpoint, method: "GET" });
  const { data } = response.data as userResponse;
  return data;
}
