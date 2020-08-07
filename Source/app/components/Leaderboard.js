import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import colors from "../config/colors";
import Run from "./Run";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      runs: [],
      name: this.props.name,
      gameid: this.props.gameid,
      categoryid: this.props.categoryid,
      variables: [],
      url: "",
    };
  }
  buildUrl = () => {
    var url = "";
    if (true) {
      url =
        "https://www.speedrun.com/api/v1/leaderboards/" +
        this.state.gameid +
        "/category/" +
        this.state.categoryid;
    } else {
    }
    this.setState({ url: url });
    console.log(url);
  };
  async FetchData() {
    const url =
      "https://www.speedrun.com/api/v1/leaderboards/76rkwed8/category/xd1erv42?var-9l733dqn=013w8gyq";
    const url2 =
      "https://www.speedrun.com/api/v1/leaderboards/76rkwed8/category/9kvmp98k";

    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, runs: data.data.runs });
  }
  componentDidMount() {
    this.buildUrl();
    this.FetchData();
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else if (this.state.categoryid == "") {
      return <Text>Select Category</Text>;
    } else {
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
