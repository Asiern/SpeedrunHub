import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
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
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.white,
  },
});

export default Button;
