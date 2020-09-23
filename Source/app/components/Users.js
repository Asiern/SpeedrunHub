import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import User from "./User";
import colors from "../config/colors";
import { SearchBar } from "react-native-elements";

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  function updateSearch(input) {
    setSearch(input);
    const usereurl = "https://www.speedrun.com/api/v1/users?name=" + input;
    //Fetch url for users
    Fetch(usereurl);
  }
  async function Fetch(userurl) {
    //Users
    const userresponse = await fetch(userurl);
    const userdata = await userresponse.json();

    //Load data to state
    setUsers(userdata.data);
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for users"
        onChangeText={updateSearch}
        value={search}
        platform="ios"
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={users}
        renderItem={({ item }) => (
          <User
            username={item.names.international}
            userid={item.id}
            navigation={props.navigation}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
