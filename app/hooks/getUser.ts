import axios from "axios";
import { userResponse } from "./types";
import { user } from "../types";

/**
 * Get user info from api
 * @param username
 * @returns User object
 */
export default async function getUser(username: string): Promise<user> {
  const endpoint: string = "https://www.speedrun.com/api/v1/users/" + username;
  const response = await axios({ url: endpoint, method: "GET" });
  const { data } = response.data as userResponse;
  let user: user = {
    image: data.assets.image.uri,
    key: null,
    userid: data.id,
    username: data.names.international,
    location: null,
    social: [],
  };

  if (data.location !== null)
    user.location = {
      country: {
        code: data.location.country.code,
        flag: { uri: null },
        names: {
          international: data.location.country.names.international,
          japanese: data.location.country.names.japanese,
        },
      },
    };

  // Get social media
  if (data.twitch !== null)
    user.social.push({ icon: "twitch", name: "Twitch", uri: data.twitch.uri });
  if (data.youtube !== null)
    user.social.push({
      icon: "youtube",
      name: "Youtube",
      uri: data.youtube.uri,
    });
  if (data.twitter !== null)
    user.social.push({
      icon: "twitter",
      name: "Twitter",
      uri: data.twitter.uri,
    });
  if (data.speedrunslive !== null)
    user.social.push({
      icon: "globe",
      name: "speedrunslive",
      uri: data.speedrunslive.uri,
    });
  if (data.hitbox !== null)
    user.social.push({
      icon: "globe",
      name: "hitbox",
      uri: data.hitbox.uri,
    });
  return user;
}
