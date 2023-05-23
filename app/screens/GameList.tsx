import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useConfig } from "../hooks";
import { game } from "../types";
import { GameCard, SquareButton } from "../components";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const { width } = Dimensions.get("screen");

const N_CARDS_SLIDE = 3;
const CARD_GAP = 6;
const CARD_WIDTH: number = (width - 2 * 30 - 2 * CARD_GAP) / N_CARDS_SLIDE;
const CARD_HEIGHT: number = (CARD_WIDTH * 4) / 3;

function GameList(): JSX.Element {
  const { config } = useConfig();
  const { games, theme } = config;
  const navigation = useNavigation();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <SquareButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>My Games</Text>
      </View>
      <View style={styles.games}>
        {games.map(({ abbreviation, id, uri }: game) => {
          return (
            <GameCard
              key={id}
              {...{
                abbreviation,
                id,
                image: uri,
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
              }}
            />
          );
        })}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  header: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginLeft: 10,
  },
  games: {
    marginHorizontal: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});

export default memo(GameList);
