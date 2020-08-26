import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import User from "./User";
import colors from "../config/colors";
import { SearchBar } from "react-native-elements";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
      loading: true,
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const usereurl = "https://www.speedrun.com/api/v1/users?name=" + input;
    //Fetch url for users
    this.Fetch(usereurl);
  };
  async Fetch(userurl) {
    //Users
    const userresponse = await fetch(userurl);
    const userdata = await userresponse.json();

    //Load data to state
    this.setState({
      loading: false,
      users: userdata.data,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search for users"
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
        />
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.users}
          renderItem={({ item }) => (
            <User
              username={item.names.international}
              userid={item.id}
              navigation={this.props.navigation}
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
export default Users;
