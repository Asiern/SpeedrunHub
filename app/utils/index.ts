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
