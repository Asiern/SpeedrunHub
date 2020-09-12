import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const NotificationCard = (props) => {
  function stripHtml(html) {
    const regex = /(<([^>]+)>)/gi;
    const result = html.replace(regex, "");
    return result;
  }
  return (
    <View style={[styles.container, { width: props.width }]}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: props.backgroundColor }]}
        onPress={() => console.log(props.text)}
      >
        <Text style={[styles.text, { color: props.color }]}>
          {stripHtml(props.text)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    padding: 20,
    alignSelf: "center",
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
});
export default NotificationCard;
