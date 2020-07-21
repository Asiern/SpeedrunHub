import { StyleSheet, View, FlatList } from "react-native";
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
  updateSearch = (search) => {
    this.setState({ search });
    //console.log(this.state.search);

    const url =
      "https://www.speedrun.com/api/v1/games?name=" + this.state.search;
    //console.log(this.state.url);
    this.setState({ url: url });
    this.Fetch(url);
  };

  async Fetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data.data[0]);
    this.setState({ loading: false, games: data.data });
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
          lightTheme={true}
        />

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
  },
});

export default Search;
