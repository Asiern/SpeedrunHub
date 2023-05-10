import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { colors } from "../themes/theme";
import GameCard from "./GameCard";
import NotificationCard from "./Notifications/NotificationCard";
import { useConfig } from "../hooks";

export default function MyGames() {
  const { config } = useConfig();
  const { games } = config;
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  return (
    <>
      {games[0] !== undefined ? (
        <View style={styles.conatiner}>
          {games.map((game) => {
            return (
              <GameCard
                key={game.id}
                id={game.id}
                image={game.uri}
                abbreviation={game.abbreviation}
              />
            );
          })}
        </View>
      ) : (
        <TouchableWithoutFeedback
          style={{ width }}
          onPress={() => navigation.navigate("Search")}
        >
          <NotificationCard
            width={width}
            color={colors.white}
            backgroundColor={colors.darkgrey}
            text={
              "It looks like your game list is empty.\nStart adding games to your list."
            }
          />
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});
