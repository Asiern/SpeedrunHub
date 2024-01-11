import { Linking } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";

export function loadInBrowser(uri: string): void {
  try {
    crashlytics().log("Opening link in browser: " + uri);
    if (uri === "" || uri === undefined || uri === null) return;
    Linking.openURL(uri).catch((err) => console.warn(err));
  } catch (e) {
    crashlytics().recordError(e);
    console.log(e);
  }
}

export function getWebViewUri(url: string): string {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const start = Math.max(url.lastIndexOf("/"), url.indexOf("=")) + 1;
    const end = url.indexOf("&") > 0 ? url.indexOf("&") : url.length;
    url = url.slice(start, end);
    return "https://www.youtube.com/embed/" + url;
  } else if (url.includes("twitch")) {
    const i = url.lastIndexOf("/") + 1;
    url =
      "https://player.twitch.tv/?video=v" +
      url.slice(i, url.length) +
      "&parent=streamernews.example.com&autoplay=false";
    return url;
  } else {
    return url;
  }
}

// Get the time label for a given time in seconds and milliseconds as float
export function getTimeLabel(time: number): string {
  return new Date(time * 1000).toISOString().substr(11, 8);
}

export function getIconFromUrl(url: string): string {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    return "youtube";
  } else if (url.includes("twitch")) {
    return "twitch";
  } else {
    return "link";
  }
}
