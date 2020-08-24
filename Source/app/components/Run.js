import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Content } from "native-base";
import colors from "../config/colors";
import user from "../config/user.json";
export default class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.props.place,
      time: this.props.time,
      runner: this.props.runner,
      runnerid: this.props.runnerid,
      loading: true,
    };
  }
  componentDidMount() {
    this.timeConverter();
    this.FetchUser(this.state.runnerid);
  }
  timeConverter() {
    var result = this.state.time;
    result = result.substr(2, result.lenght);
    this.setState({ time: result });
  }
  async FetchUser(runnerid) {
    const url = "https://www.speedrun.com/api/v1/users/" + runnerid;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, runner: data.data.names.international });
  }
  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,

    // add shadows for Android only
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 1,
  },
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 1,
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
    flex: 7,
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
    color: colors.primary,
  },
  cover: {
    height: 60,
    width: 45,
  },
});
module.export = Run;
