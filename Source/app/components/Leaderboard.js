import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import data from "../assets/json/Any%Leaderboard.json";
import Run from "./Run";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: "",
    };
  }
  getData() {
    fetch(
      "https://www.speedrun.com/api/v1/leaderboards/xldev513/category/rklg3rdn"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.data.runs);
        this.setState({ dataSource: responseJson.data.runs });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return <Run data={this.state.dataSource} />;
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Leaderboard;
