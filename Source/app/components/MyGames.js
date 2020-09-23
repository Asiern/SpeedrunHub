import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "./GameCard";

export default function MyGames(props) {
  return (
    <View style={styles.conatiner}>
      <FlatList
        data={props.data}
        numColumns={3}
        keyExtractor={(item) => item.id}
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
  conatiner: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});
