import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "./GameCard";
import colors from "../config/colors";
import { SearchBar } from "react-native-elements";

export default function Games() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  function updateSearch(input) {
    setSearch(input);
    const url = "https://www.speedrun.com/api/v1/games?name=" + input;
    Fetch(url);
  }
  async function Fetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    setGames(data.data);
  }
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for games"
        onChangeText={updateSearch}
        value={search}
        platform="ios"
      />
      <FlatList
        style={styles.flatList}
        numColumns={3}
        keyExtractor={(item) => item.id}
        data={games}
        renderItem={({ item }) => (
          <GameCard id={item.id} abbreviation={item.abbreviation} />
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
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
  },
});
