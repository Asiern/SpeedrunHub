import React, { Component } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      abbreviation: this.props.abbreviation,
      cover:
        "https://www.speedrun.com/themes/" +
        this.props.abbreviation +
        "/cover-256.png",
    };
  }

  render() {
    const shadow = {
      width: 110,
      height: 153,
      color: "#000000",
      radius: 10,
      opacity: 0.6,
      x: 5,
      y: 5,
      style: { marginVertical: 5 },
    };
    return (
      <View style={{ padding: 2 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Game Info", {
              id: this.state.id,
              name: "name",
              abbreviation: this.state.abbreviation,
            })
          }
          style={styles.container}
        >
          <ImageBackground
            source={{ uri: this.state.cover }}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,

    // add shadows for Android only
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 5,
  },
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

export default GameCard;
