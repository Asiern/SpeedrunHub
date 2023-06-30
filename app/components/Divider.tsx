import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

function Divider(): JSX.Element {
  return <View style={styles.divider} />;
}
const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e1e1e1",
  },
});

export default memo(Divider);
