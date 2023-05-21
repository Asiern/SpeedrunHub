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
): Promise<notificationResponse | null> {
  return new Promise((resolve, reject) => {
    const endpoint =
      "https://www.speedrun.com/api/v1/notifications?max=" +
      config.notifications.max;

    axios({
      url: endpoint,
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": config.key },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        reject(null);
      });
  });
}
