import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "./GameCard";
import colors from "../config/colors";
import { SearchBar } from "react-native-elements";

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: "",
      loading: true,
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const gameeurl = "https://www.speedrun.com/api/v1/games?name=" + input;
    //Fetch url for users
    this.Fetch(gameeurl);
  };
  async Fetch(gameurl) {
    //Users
    const gameresponse = await fetch(gameurl);
    const gamedata = await gameresponse.json();

    //Load data to state
    this.setState({
      loading: false,
      games: gamedata.data,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search for games"
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
        />
        <FlatList
          style={styles.flatList}
          numColumns={3}
          keyExtractor={(item) => item.id}
          data={this.state.games}
          renderItem={({ item }) => (
            <GameCard
              navigation={this.props.navigation}
              id={item.id}
              abbreviation={item.abbreviation}
            />
          )}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
  },
  gamecontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 2,
    justifyContent: "space-around",
  },
  headercontainer: {
    backgroundColor: colors.primary,
  },
  headertext: {
    color: colors.white,
    fontSize: 25,
    padding: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default Games;
