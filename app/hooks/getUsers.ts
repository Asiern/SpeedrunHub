import axios from "axios";
import { usersResponse } from "./types";

/**
 * Get users matching the query
 * @param query username query
 * @param pagination number of users to fetch
 * @returns list of users
 */
export default async function getUsers(
  query: string,
  pagination?: number
): Promise<usersResponse> {
  let url: string = "https://www.speedrun.com/api/v1/users?name=" + query;

  // Add pagination parameter
  // if (pagination) endpoint += `?max=${pagination}`;
  const users = (await axios({ method: "GET", url })).data as usersResponse;
  return users;
}
