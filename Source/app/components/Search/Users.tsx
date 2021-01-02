import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import User from "./User";
import { SearchBar } from "./SearchBar";
import { context } from "../../config/config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { theme } = useContext(context);

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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <SearchBar
        placeholder="Search for users"
        onChangeText={updateSearch}
        value={search}
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
  },
});
