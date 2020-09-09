import React from "react";
import { Text, View, StyleSheet } from "react-native";

const NotificationCard = (props) => {
  return (
    <View style={[styles.container, { width: props.width }]}>
      <Text style={styles.text}>NotificationCard</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    padding: 20,
    alignSelf: "center",
  },
});
export default NotificationCard;
