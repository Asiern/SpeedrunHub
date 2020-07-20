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
      cover:
        "https://www.speedrun.com/themes/" +
        this.props.abbreviation +
        "/cover-64.png",
      game: this.props.game,
      abbreviation: this.props.abbreviation,
      loading: true,
    };
  }
  componentDidMount() {
    this.timeConverter();
  }
  timeConverter() {
    var result = this.state.time;
    result = result.substr(2, result.lenght);
    this.setState({ time: result });
  }
  render() {
    return (
      <Content>
        <View style={styles.container}>
          <View style={styles.game}>
            <Image
              style={styles.cover}
              source={{ uri: this.state.cover }}
            ></Image>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{this.state.category}</Text>
          </View>
          <View style={styles.place}>
            <Text style={styles.accenttext}>{this.state.place}</Text>
          </View>
          <View style={styles.runner}>
            <Text style={styles.text}>{this.state.runner}</Text>
          </View>

          <View style={styles.time}>
            <Text style={styles.text}>{this.state.time}</Text>
          </View>
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
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  game: {
    flex: 3,
    //backgroundColor: "dodgerblue",
    alignItems: "center",
  },
  category: {
    flex: 5,
    //backgroundColor: "gold"
    alignItems: "center",
  },
  place: {
    flex: 3,
    //backgroundColor: "tomato",
    alignItems: "center",
  },
  runner: {
    flex: 5,
    //backgroundColor: "green",
    alignItems: "center",
  },
  time: {
    flex: 8,
    //backgroundColor: "orange",
    alignItems: "center",
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
