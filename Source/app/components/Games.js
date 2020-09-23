import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "./GameCard";
import colors from "../config/colors";
import { SearchBar } from "react-native-elements";

export default function Games(props) {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  function updateSearch(input) {
    setSearch(input);
    const gameeurl = "https://www.speedrun.com/api/v1/games?name=" + input;
    //Fetch url for users
    Fetch(gameeurl);
  }
  async function Fetch(gameurl) {
    //Users
    const gameresponse = await fetch(gameurl);
    const gamedata = await gameresponse.json();

    //Load data to state
    setGames(gamedata.data);
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
          <GameCard
            navigation={props.navigation}
            id={item.id}
            abbreviation={item.abbreviation}
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
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
  },
});
