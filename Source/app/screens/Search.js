import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { Component, useState } from "react";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import color from "../config/colors";
import colors from "../config/colors";
import GameCard from "../components/GameCard";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      loading: true,
      games: [],
      url: "https://www.speedrun.com/api/v1/games?name=",
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const url = "https://www.speedrun.com/api/v1/games?name=" + input;
    this.Fetch(url);
  };

  async Fetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, games: data.data });
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
          lightTheme={true}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.games}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <GameCard
                  navigation={this.props.navigation}
                  id={item.id}
                  abbreviation={item.abbreviation}
                />
              </View>
            )}
            numColumns={2}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  flatList: {
    flexWrap: "wrap",
    flex: 1,
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Search;
