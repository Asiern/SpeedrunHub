import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const VideoPreview = ({ link, weblink }) => (
  <View style={styles.container}>
    <WebView
      style={{ marginTop: Platform.OS == "ios" ? 20 : 0 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{
        uri: "https://expo.io",
      }}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
});
export default VideoPreview;
