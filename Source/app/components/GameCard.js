import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import colors from "../config/colors";

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      cover:
        "https://www.speedrun.com/themes/" + this.props.name + "/cover-256.png",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.cover }}
          style={styles.image}
        ></ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    width: 150,
    height: 200,
  },
  image: {
    borderRadius: 20,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default GameCard;
