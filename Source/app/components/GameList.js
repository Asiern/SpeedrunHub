import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../config/colors";
class GameList extends Component {
  render() {
    return <View style={styles.container}></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameList;
