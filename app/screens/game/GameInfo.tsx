import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useConfig } from "../../hooks";
import { Header } from "../../components";
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
