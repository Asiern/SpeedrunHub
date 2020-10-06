import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

import colors from "../config/colors";

const { width } = Dimensions.get("screen");
const SectionHeader = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            "https://www.speedrun.com/themes/" +
            props.abbreviation +
            "/cover-256.png",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.text}>{props.name}</Text>
      </ImageBackground>
    </View>
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
