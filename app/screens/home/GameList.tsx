import React, { useContext } from "react";
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { context } from "../../config/config";
import { game } from "../../types";

const data: game[] = [
  {
    abbreviation: "sms",
    id: "1kgr75w4",
    uri: "https://www.speedrun.com/themes/mk64/cover-128.png",
  },
  {
    abbreviation: "sms",
    id: "1kgr75w4",
    uri: "https://www.speedrun.com/themes/mk64/cover-128.png",
  },
  {
    abbreviation: "sms",
    id: "1kgr75w4",
    uri: "https://www.speedrun.com/themes/mk64/cover-128.png",
  },
  {
    abbreviation: "sms",
    id: "1kgr75w4",
    uri: "https://www.speedrun.com/themes/mk64/cover-128.png",
  },
];

const { height, width } = Dimensions.get("screen");
const PADDING = 30;
const CARD_HEIGHT: number = (height / 2 - 2 * PADDING) / 2 - PADDING / 2;
const CARD_WIDTH: number = 60;

function GameCard({ abbreviation, id, uri }: game): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;

  return (
    <View
      style={{
        flex: 1,
        height: CARD_HEIGHT,
        borderRadius: 15,
        backgroundColor: theme.colors.foreground,
      }}
    >
      <Image style={{ ...StyleSheet.absoluteFillObject }} source={{ uri }} />
      <Text>some text</Text>
    </View>
  );
}

export function GameList(): JSX.Element {
  const { config, setConfig } = useContext(context)!;
  const { games, theme } = config;

  function setGames(games: game[]): void {
    setConfig({ ...config, games });
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ margin: 30, backgroundColor: "teal" }}
        decelerationRate={"fast"}
        numColumns={2}
        data={data}
        renderItem={({ item }) => (
          <GameCard
            key={item.id}
            abbreviation={item.abbreviation}
            id={item.id}
            uri={item.uri}
          />
        )}
      />
    </View>
  );
}
