import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import config from "../config/config.json";
import colors from "../config/colors";
import { color } from "react-native-reanimated";
class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  componentDidMount() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        });
      })
      .catch((error) => {
        console.log("APIerror");
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      let movies = this.state.dataSource.map((val, key) => {
        return (
          <View style={styles.container}>
            <View style={styles.game}>
              <View key={key}>
                <Text>{val.title}</Text>
              </View>
            </View>
          </View>
        );
      });

      return <View>{movies}</View>;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.light,
    padding: 8,
    width: 300,
    alignItems: "center",
    alignSelf: "center",
    top: 20,
  },
  game: {
    flex: 1,
    paddingVertical: 40,
    width: 300,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameList;
