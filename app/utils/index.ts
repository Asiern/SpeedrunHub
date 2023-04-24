import { Linking } from "react-native";

export function loadInBrowser(uri: string): void {
  if (uri === "" || uri === undefined || uri === null) return;
  Linking.openURL(uri).catch((err) => console.warn(err));
}
