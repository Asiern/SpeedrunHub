import React from "react";
import { StyleSheet, View } from "react-native";
import GameCard from "./GameCard";

export interface MyGamesProps {
  data: any[];
}

export default function MyGames({ data }: MyGamesProps) {
  return (
    <View style={styles.conatiner}>
      {data.map((game) => {
        return (
          <GameCard
            key={game.id}
            id={game.id}
            abbreviation={game.abbreviation}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
  },
});
