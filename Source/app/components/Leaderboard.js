import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import data from "../assets/json/Any%Leaderboard.json";
import Run from "./Run";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      runs: [],
      name: this.props.name,
      gameid: this.props.gameid,
      categoryid: this.props.categoryid,
    };
  }
  async FetchData() {
    const url =
      "https://www.speedrun.com/api/v1/leaderboards/76rkwed8/category/9kvmp98k";
    const variable =
      "https://www.speedrun.com/api/v1/categories/xd1erv42/variables?";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, runs: data.data.runs });
    //console.log(this.state.runs[55]);
  }
  componentDidMount() {
    this.FetchData();
  }
  render() {
    if (this.state.isLoading) {
      <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1 }}>
        {this.state.runs.map((run) => (
          <Run
            key={run.run.id}
            category={run.run.category}
            place={run.place}
            runnerid={run.run.players[0].id}
            time={run.run.times.primary}
            abbreviation={"na"}
          />
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  banner: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 60,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: "row",
    opacity: 1,
  },
  title: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Leaderboard;
