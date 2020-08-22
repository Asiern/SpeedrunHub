import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SectionList,
  Settings,
} from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import colors from "../config/colors";
import GameCard from "../components/GameCard";
import User from "../components/User";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs } from "native-base";
import A from "../screens/Settings";
import Themes from "./Themes";

const Tab = createMaterialTopTabNavigator();

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
  renderUsers = ({ user }) => (
    <User
      username={user.names.international}
      userid={user.id}
      navigation={this.props.navigation}
    />
  );
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
        <Tab.Navigator>
          <Tab.Screen name="Games" component={Themes} />
          <Tab.Screen name="Users" component={Themes} />
        </Tab.Navigator>
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
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
    margin: 20,
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
