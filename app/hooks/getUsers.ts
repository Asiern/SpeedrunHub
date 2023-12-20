import axios from "axios";
import { usersResponse } from "./types";
import { USER_AGENT } from "../constants/requests";

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
  const url = `https://www.speedrun.com/api/v1/users?name=${query}&max=${pagination}`;

  // Add pagination parameter
  // if (pagination) endpoint += `?max=${pagination}`;
  const users = (
    await axios({ method: "GET", url, headers: { "User-Agent": USER_AGENT } })
  ).data as usersResponse;
  return users;
}
