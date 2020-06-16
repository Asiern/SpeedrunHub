import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Body,
  Left,
  List,
  ListItem,
} from "native-base";
import { color } from "react-native-reanimated";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";
export default class Run extends Component {
  render() {
    return (
      <Content>
        <View style={styles.container}>
          <Text style={styles.text}>Any% No Wrong Warp</Text>
          <Text style={styles.text}>1st</Text>
          <Text style={styles.text}>Regole</Text>
          <Text style={styles.text}>39m 07s</Text>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 15,
  },
});
module.export = Run;
