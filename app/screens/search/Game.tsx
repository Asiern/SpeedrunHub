import React, { memo, useContext } from "react";
import { Text, View } from "react-native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { game } from "../../hooks/types";
import { shadow } from "../../themes/theme";
import { context } from "../../config/config";
import { useNavigation } from "@react-navigation/native";

interface IGame {
  game: game;
}

const GAME_HEIGHT: number = 60;

function Game({ game }: IGame): JSX.Element {
  const { config } = useContext(context)!;
  const { theme } = config;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Game Info", {
          id: game.id,
          abbreviation: game.abbreviation,
        })
      }
      key={game.id}
      style={[
        styles.container,
        shadow,
        { backgroundColor: theme.colors.foreground },
      ]}
    >
      <Image
        style={styles.image}
        source={{ uri: game.assets["cover-large"].uri }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {game.names.international}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    borderRadius: 5,
    height: GAME_HEIGHT,
    width: GAME_HEIGHT * (3 / 4), // 3:4 aspect ratio
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontFamily: "Poppins",
  },
});

export default memo(Game);
