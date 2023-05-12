import React, { memo } from "react";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { game } from "../../hooks/types";
import { View } from "react-native";

const { width } = Dimensions.get("screen");
export const CARD_WIDTH: number = width - 60;
export const CARD_HEIGHT = 80;

interface IGameCard {
  game: game;
}

function GameCard({ game }: IGameCard): JSX.Element {
  return (
    <Animated.View style={styles.container}>
      <Image
        style={styles.bgImage}
        resizeMode="cover"
        source={{ uri: game.assets["cover-large"].uri }}
        blurRadius={2}
      />
      <View style={styles.foreground}>
        <Image
          source={{ uri: game.assets["cover-large"].uri }}
          style={styles.fgImage}
        />
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {game.names.international}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  foreground: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  fgImage: {
    height: CARD_HEIGHT - 15,
    width: (CARD_HEIGHT - 15) * (3 / 4),
    borderRadius: 2,
  },
  text: {
    textAlign: "center",
    flex: 1,
    fontFamily: "Poppins",
    color: "#fff",
    alignSelf: "center",
    fontSize: 16,
  },
});

export default memo(GameCard);
