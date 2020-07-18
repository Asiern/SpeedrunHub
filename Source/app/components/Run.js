import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
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
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      place: this.props.place,
      time: this.props.time,
      runner: this.props.runner,
    };
  }
  render() {
    return (
      <Content>
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.category}</Text>
          <Text style={styles.text}>{this.state.place}</Text>
          <Text style={styles.text}>{this.state.runner}</Text>
          <Text style={styles.text}>{this.state.time}</Text>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 15,
  },
});
module.export = Run;
