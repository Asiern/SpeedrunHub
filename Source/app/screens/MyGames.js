import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import user from "../config/user.json";
import Game from "../components/Game";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";

export default function MyGames(props) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        _retrieveData();
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  });
  async function _retrieveData() {
    try {
      var games = await AsyncStorage.getItem("@MyGames");
      var gameList = JSON.parse(games);
      setGames(gameList);
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }
  async function _removeGame(id) {
    const found = false;
    for (let game of games) {
      if (game.id == id && !found) {
        const index = games.indexOf(game);
        games.splice(index, 1);
        var outGameList = JSON.stringify(games);
        await AsyncStorage.setItem("@MyGames", outGameList);
        setGames(games);
        return;
      } else {
        console.log("Game not found");
      }
    }
  }

  async function _storeDatatest(id, abbreviation) {
    try {
      let gameList = [];
      for (let game of user.games) {
        var outGame = {
          id: "",
          abbreviation: "",
        };
        outGame.id = game.id;
        outGame.abbreviation = game.abbreviation;
        gameList.push(outGame);
      }
      //console.log(gameList);
      var outGameList = JSON.stringify(gameList);
      await AsyncStorage.setItem("@MyGames", outGameList);
      _retrieveData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={"Store Data"}
        style={styles.button}
        color={colors.primary}
        onPress={() => _storeDatatest("76rkwed8", "na")}
      />
      <Button
        title={"Remove game"}
        style={styles.button}
        color={colors.primary}
        onPress={() => _removeGame("76rkwed8")}
      />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Game title={item.abbreviation} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
