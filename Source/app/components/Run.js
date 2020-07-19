import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Content } from "native-base";
import colors from "../config/colors";
export default class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      place: this.props.place,
      time: this.props.time,
      runner: this.props.runner,
      cover: "https://www.speedrun.com/themes/oot/cover-128.png",
      game: this.props.game,
      loading: true,
    };
  }

  render() {
    return (
      <Content>
        <View style={styles.container}>
          <Image
            style={styles.cover}
            source={{ uri: this.state.cover }}
          ></Image>
          <Text style={styles.text}>{this.state.category}</Text>
          <Text style={styles.accenttext}>{this.state.place}</Text>
          <Text style={styles.text}>{this.state.runner}</Text>
          <Text style={styles.text}>{this.state.time}</Text>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.Crystalline1,
  },
  cover: {
    height: 60,
    width: 45,
  },
});
module.export = Run;
