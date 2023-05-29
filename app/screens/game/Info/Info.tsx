import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameCard } from "../../../components/GameCard";
import { game, platform } from "../../../hooks/types";
import { useConfig } from "../../../hooks";

interface IInfo {
  platforms: platform[];
  game: game;
}

function Info({ platforms, game }: IInfo): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const { id, abbreviation } = game;
  return (
    <View style={styles.container}>
      <GameCard
        disabled
        {...{ id, abbreviation, image: game.assets["cover-large"].uri ?? "" }}
      />
      <View style={styles.info}>
        <Text
          style={[styles.text, { color: theme.colors.text }]}
          ellipsizeMode="tail"
          numberOfLines={4}
        >
          {platforms
            .map(({ name }) => {
              return name;
            })
            .join(", ")}
        </Text>
        <Text
          style={[styles.text, { marginTop: 10, color: theme.colors.text }]}
        >
          Released: {game["release-date"]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    flexDirection: "row",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  text: {
    fontFamily: "Poppins",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default memo(Info);
