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
  let endpoint: string = "https://www.speedrun.com/api/v1/users?name=" + query;

  // Add pagination parameter
  if (pagination) endpoint += `?max=${pagination}`;

  return (await axios({ url: endpoint, method: "GET" })).data as usersResponse;
}
