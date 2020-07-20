import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

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
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.cover }}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
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
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default GameCard;
