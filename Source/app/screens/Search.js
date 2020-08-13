import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Text,
  ScrollView,
} from "react-native";
import React, { Component, useState } from "react";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import colors from "../config/colors";
import GameCard from "../components/GameCard";
import User from "../components/User";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      loading: true,
      filter: "games",
      games: [],
      users: [],
      gameurl: "https://www.speedrun.com/api/v1/games?name=",
      userurl: "https://www.speedrun.com/api/v1/users?name=",
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const gameurl = "https://www.speedrun.com/api/v1/games?name=" + input;
    const usereurl = "https://www.speedrun.com/api/v1/users?name=" + input;
    this.Fetch(gameurl, usereurl);
  };

  async Fetch(gameurl, userurl) {
    const gameresponse = await fetch(gameurl);
    const gamedata = await gameresponse.json();
    const userresponse = await fetch(userurl);
    const userdata = await userresponse.json();

    this.setState({
      loading: false,
      games: gamedata.data,
      users: userdata.data,
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
          lightTheme={true}
        />
        <ScrollView>
          <Text style={styles.headertext}>Games</Text>
          <View style={{ flex: 2 }}>
            {this.state.games.map((item) => (
              <GameCard
                key={item.id}
                navigation={this.props.navigation}
                id={item.id}
                abbreviation={item.abbreviation}
              />
            ))}
          </View>
          <Text style={styles.headertext}>Users</Text>
          <View style={{ flex: 1 }}>
            {this.state.users.map((item) => (
              <User
                key={item.id}
                username={item.names.international}
                userid={item.id}
                navigation={this.props.navigation}
              />
            ))}
          </View>
        </ScrollView>
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
  headertext: {
    color: colors.Crystalline1,
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Search;
