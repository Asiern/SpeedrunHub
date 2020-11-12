import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function GameCard(props) {
  return (
    <View style={{ padding: 2 }}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Game Info", {
            id: props.id,
            abbreviation: props.abbreviation,
          })
        }
        style={styles.container}
      >
        <ImageBackground
          source={{
            uri:
              "https://www.speedrun.com/themes/" +
              props.abbreviation +
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
