import axios from "axios";
import { config } from "../types";
import { notificationResponse } from "./types";

/**
 * Get notifications from api (API key needed)
 * @param config config object
 * @returns List of notifications
 */
export default async function getNotifications(
  config: config
): Promise<notificationResponse> {
  const endpoint =
    "https://www.speedrun.com/api/v1/notifications?max=" +
    config.notifications.max;

  const { data } = await axios({
    url: endpoint,
    method: "GET",
    headers: { Accept: "application/json", "X-API-Key": config.user.key },
  });
  return data;
}
