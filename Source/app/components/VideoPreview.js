import React from "react";
import { View, StyleSheet } from "react-native";

const VideoPreview = ({ link, weblink }) => (
  <View style={styles.container}></View>
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
