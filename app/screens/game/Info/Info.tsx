import React, { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameCard } from "../../../components/GameCard";
import { game, platform } from "../../../hooks/types";
import { useConfig } from "../../../hooks";
import { Button } from "../../../components";

interface IInfo {
  platforms: platform[];
  game: game;
}

function Info({ platforms, game }: IInfo): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const { id, abbreviation } = game;
  const [liked, setLiked] = useState<boolean>(
    config.games.find(({ id }) => game.id === id) !== undefined
  );

  function likeGame() {
    setConfig({
      ...config,
      games: [
        ...config.games,
        {
          abbreviation: game.abbreviation,
          id: game.id,
          uri: game.assets["cover-large"].uri ?? "",
        },
      ],
    });
    setLiked(true);
  }
  function dislikeGame() {
    setConfig({
      ...config,
      games: [
        ...config.games.filter(({ id }) => {
          id !== game.id;
        }),
      ],
    });
    setLiked(false);
  }

  return (
    <View style={styles.container}>
      <GameCard
        disabled
        {...{ id, abbreviation, image: game.assets["cover-large"].uri ?? "" }}
      />
      <View style={styles.info}>
        <Button
          label={liked ? "Remove" : "Add to my games"}
          icon={liked ? "minus" : "plus"}
          onPress={liked ? dislikeGame : likeGame}
          style={{ flex: 0 }}
          shadow
        />
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
    justifyContent: "space-between",
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
