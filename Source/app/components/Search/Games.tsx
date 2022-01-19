import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "../GameCard";
import { SearchBar } from "./SearchBar";
import { context } from "../../config/config";

export default function Games() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const { theme } = useContext(context);

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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <SearchBar
        placeholder="Search for games"
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        style={styles.flatList}
        numColumns={3}
        keyExtractor={(item) => item.id}
        data={games}
        renderItem={({ item }) => (
          <GameCard
            id={item.id}
            abbreviation={item.abbreviation}
            image={item.assets["cover-medium"].uri}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
  },
});
