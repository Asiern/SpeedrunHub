import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, ImageBackground, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface GameCardProps {
  id: string;
  abbreviation: string;
}

export default function GameCard({ id, abbreviation }: GameCardProps) {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 2 }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Game Info", {
            id,
            abbreviation,
          })
        }
        style={styles.container}
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
        ></ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 113,
    height: 160,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "row",
  },
});
