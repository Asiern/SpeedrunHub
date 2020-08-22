import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
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
      url: this.props.url,
    };
  }

  async FetchData() {
    const response = await fetch(this.props.url);
    const data = await response.json();
    this.setState({ loading: false, runs: data.data.runs });
  }
  componentDidMount() {
    this.FetchData();
  }
  renderItem = ({ item }) => (
    <Run
      place={item.place}
      runnerid={item.run.players[0].id}
      time={item.run.times.primary}
      abbreviation={this.props.abbreviation}
      categoryid={item.run.category}
      category={item.run.category}
    />
  );
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else if (this.props.url == null) {
      return <Text>Select Category</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item) => item.run.id}
            data={this.state.runs}
            renderItem={this.renderItem}
          ></FlatList>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
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
