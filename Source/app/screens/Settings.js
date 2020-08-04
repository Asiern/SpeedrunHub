import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import colors from "../config/colors";
import user from "../config/user.json"
import User from "../components/User"



class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      users: [],
      url: "https://www.speedrun.com/api/v1/users?name=",
    };
  }
  updateSearch = (input) => {
    this.setState({ search: input });
    const url = "https://www.speedrun.com/api/v1/users?name=" + input;
    this.Fetch(url);
    console.log(this.state.users)
    console.log(url)
  };
  async Fetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, users: data.data });
  }

  saveJson=(username, userid)=>{
    user.name = username,
    user.id = userid
  };
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
            data={this.state.users}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <User username={item.names.international}/>
              </View>
            )}
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
    alignContent:"center",
    justifyContent:"center"
  },
  textinputcontainer: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textinput: {
    height: 50,
    width: "90%",
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});

export default Settings;
