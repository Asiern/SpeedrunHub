import { StyleSheet, View } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import colors from "../config/colors";
import User from "../components/User";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Games from "../components/Games";
import Users from "../components/Users";

const Tab = createMaterialTopTabNavigator();

class Search extends React.Component {
  constructor(props) {
    super(props);
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
        <Tab.Navigator
          style={styles.navigator}
          tabBarOptions={{
            activeTintColor: colors.darkgrey,
            labelStyle: { fontSize: 15 },
            style: { backgroundColor: colors.white },
            indicatorStyle: { backgroundColor: colors.primary },
          }}
        >
          <Tab.Screen
            name="Games"
            component={Games}
            props={{ data: this.state.games }}
          />
          <Tab.Screen
            name="Users"
            component={Users}
            initialParams={{ itemId: 42, data: this.state.users }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  navigator: {
    marginTop: Constants.statusBarHeight,
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
