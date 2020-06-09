import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import colors from "../config/colors";
import { color } from "react-native-reanimated";
import ds from "../assets/json/ds.json";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      id: this.props.id,
      name: this.props.name,
      cover:
        "https://www.speedrun.com/themes/" + this.props.name + "/cover-128.png",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.game}>
          <View style={styles.cover}>
            <Image
              style={styles.coverimage}
              source={{
                uri: this.state.cover,
              }}
            ></Image>
          </View>
          <View style={styles.paragraph}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.text}>{ds.data["release-date"]}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 1,
    width: 300,
    alignItems: "center",
    alignSelf: "center",
  },
  game: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    paddingVertical: 20,
    paddingLeft: 20,
    width: 400,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
  },
  cover: {
    width: 80,
    height: 120,
    alignContent: "center",
    backgroundColor: colors.secondary,
    padding: 2,
  },
  coverimage: {
    flex: 1,
  },
  paragraph: {
    alignContent: "space-between",
    flexDirection: "column",
    flex: 1,
    height: 120,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameCard;
