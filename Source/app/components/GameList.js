import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import config from "../config/config.json";
import colors from "../config/colors";
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
      .then((responseJosn) => {
        this.setState({
          isLoading: false,
          dataSource: responseJosn.movies,
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
          <View style={styles.container} key={key}>
            <Text>{val.title}</Text>
          </View>
        );
      });

      return <View>{movies}</View>;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.light,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameList;
