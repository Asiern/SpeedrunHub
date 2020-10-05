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
      ></ImageBackground>
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
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default SectionHeader;
