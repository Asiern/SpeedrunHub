import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

import { colors } from "../themes/theme";

export interface SectionHeaderProps {
  id: string;
  abbreviation: string;
  name: string;
}
const { width } = Dimensions.get("screen");
const SectionHeader = ({ id, abbreviation, name }: SectionHeaderProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Game Info", {
          id,
          abbreviation,
        })
      }
    >
      <ImageBackground
        source={{
          uri:
            "https://www.speedrun.com/themes/" +
            abbreviation +
            "/cover-256.png",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: 100,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    backgroundColor: colors.black,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
    alignSelf: "center",
    marginTop: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "row",
    opacity: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    textShadowColor: "#2e2e2e",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
    marginHorizontal: 20,
  },
});
export default SectionHeader;
