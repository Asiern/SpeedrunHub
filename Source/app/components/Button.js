import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const Button = (props) => {
  function _storeData() {
    props.function(props.user);
  }
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color }]}
      onPress={() => _storeData()}
    >
      <Text style={[styles.text, { color: props.textcolor }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

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

export default Button;
