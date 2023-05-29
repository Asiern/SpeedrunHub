import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useConfig } from "../../hooks";
import { Header } from "../../components";
import Constants from "expo-constants";
import { game } from "../../hooks/types";
import { InfoContainer } from "./Info";
import { CategoriesContainer } from "./Categories";
import { VariablesContainer } from "./Variables";
import { LeaderboardContainer } from "./Leaderboard";

interface IGameInfo {
  game: game;
}

export type selectedVariables = { [key: string]: string };

function GameInfo({ game }: IGameInfo): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const [category, setCategory] = useState<string>("");
  const [selectedVariables, setSelectedVariables] = useState<selectedVariables>(
    {}
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title={game?.names.international} />
      <InfoContainer {...{ game }} />
      <CategoriesContainer {...{ game, category, setCategory }} />
      <VariablesContainer
        {...{ category, selectedVariables, setSelectedVariables }}
      />
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
