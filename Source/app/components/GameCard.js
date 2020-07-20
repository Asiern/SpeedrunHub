import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button } from "native-base";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

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
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Game Info", { id: this.props.id })
        }
        style={styles.container}
      >
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: this.state.cover }}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>
        </View>
      </TouchableOpacity>
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
    flexDirection: "row",
  },
});

export default GameCard;
