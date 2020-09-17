import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../config/colors";

export interface ButtonProps {
  color: String;
  title: String;
  backgroundColor: String;
}

export function Button(props: ButtonProps) {
  function _storeData() {
    //props.function(props.user, props.keyinput);
    null;
  }
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: "#fff" }]}
      onPress={() => _storeData()}
    >
      <Text style={[styles.text, { color: "#000" }]}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 200,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 5,
    backgroundColor: colors.primary,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.white,
  },
});
