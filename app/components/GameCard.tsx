import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, ImageBackground, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadow } from "../themes/theme";

export interface GameCardProps {
  id: string;
  abbreviation: string;
  image: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export function GameCard({
  id,
  abbreviation,
  image,
  width = 113,
  height = 160,
  style,
  disabled = false,
}: GameCardProps): JSX.Element {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      testID="game-card-touchable-opacity"
      onPress={() =>
        navigation.navigate("GameInfo", {
          id,
          abbreviation,
        })
      }
      style={[styles.container, { width, height }, shadow, style]}
      disabled={disabled}
    >
      <ImageBackground
        testID="game-card-image-background"
        source={{
          uri: image,
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      ></ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default memo(GameCard);
