import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import User from "./User";
import { colors } from "../../themes/theme";
import { SearchBar } from "react-native-elements";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  function updateSearch(input) {
    setSearch(input);
    const url = "https://www.speedrun.com/api/v1/users?name=" + input;
    Fetch(url);
  }
  async function Fetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data.data);
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
          <User username={item.names.international} userid={item.id} />
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
