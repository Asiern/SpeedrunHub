import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useConfig } from "../../hooks";
import { Header, SquareButton } from "../../components";
import Constants from "expo-constants";
import { game } from "../../hooks/types";
import { InfoContainer } from "./Info";
import { CategoriesContainer } from "./Categories";
import { VariablesContainer } from "./Variables";
import { LeaderboardContainer } from "./Leaderboard";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { ADS_IDS } from "../../constants/ads";

interface IGameInfo {
  game: game;
}

export type selectedVariables = { [key: string]: string };

function GameInfo({ game }: IGameInfo): JSX.Element {
  const { config, setConfig } = useConfig();
  const { theme } = config;
  const [category, setCategory] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(
    config.games.find(({ id }) => game.id === id) !== undefined
  );
  const [selectedVariables, setSelectedVariables] = useState<selectedVariables>(
    {}
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
    const { games } = config;
    const index = games.findIndex((g) => g.id === game.id);
    if (index === -1) {
      setLiked(false);
      return;
    }

    const newList: typeof config.games = [
      ...games.slice(0, index),
      ...games.slice(index + 1, games.length),
    ];

    setConfig({
      ...config,
      games: newList,
    });
    setLiked(false);
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title={game?.names.international}
        button={
          <SquareButton
            icon="heart"
            onPress={() => (liked ? dislikeGame() : likeGame())}
            variant={liked ? "primary" : "default"}
          />
        }
      />
      <InfoContainer {...{ game }} />
      <CategoriesContainer {...{ game, category, setCategory }} />
      <VariablesContainer
        {...{ category, selectedVariables, setSelectedVariables }}
      />
      <View
        style={{
          marginVertical: 10,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={__DEV__ ? TestIds.BANNER : ADS_IDS.GameInfo}
        />
      </View>
      <LeaderboardContainer
        {...{ game, category, variables: selectedVariables }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default GameInfo;
