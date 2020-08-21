import { StyleSheet, View, Text, ScrollView, SectionList } from "react-native";
import React from "react";
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
      games: [],
      users: [],
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const gameurl = "https://www.speedrun.com/api/v1/games?name=" + input;
    const usereurl = "https://www.speedrun.com/api/v1/users?name=" + input;
    //Fetch url for users and games
    this.Fetch(gameurl, usereurl);
  };

  async Fetch(gameurl, userurl) {
    //Games
    const gameresponse = await fetch(gameurl);
    const gamedata = await gameresponse.json();
    //Users
    const userresponse = await fetch(userurl);
    const userdata = await userresponse.json();

    //Load data to state
    this.setState({
      loading: false,
      games: gamedata.data,
      users: userdata.data,
    });
  }
  searchbar = () => {
    return (
      <SearchBar
        placeholder="Search for games and users"
        onChangeText={this.updateSearch}
        value={search}
        platform="ios"
      />
    );
  };
  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search for games and users"
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
          lightTheme={true}
        />
        <ScrollView>
          <View style={styles.headercontainer}>
            <Text style={styles.headertext}>Games</Text>
          </View>

          <View style={styles.gamecontainer}>
            {this.state.games.map((item) => (
              <GameCard
                key={item.id}
                navigation={this.props.navigation}
                id={item.id}
                abbreviation={item.abbreviation}
              />
            ))}
          </View>
          <View style={styles.headercontainer}>
            <Text style={styles.headertext}>Users</Text>
          </View>
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

export default Search;
