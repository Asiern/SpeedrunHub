import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";
import user from "../config/user.json";
import GameCard from "../components/GameCard";
import colors from "../config/colors";
class MyGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }
  _retrieveData = async () => {
    try {
      var games = await AsyncStorage.getItem("@games");
      this.setState({ games });
    } catch (error) {
      // Error retrieving data
    }
  };
  _storeData = async (id, abbreviation) => {
    try {
      let gameList = [];
      for (let game of user.games) {
        var outGame = {
          id: "",
          abbreviation: "",
        };
        outGame.id = game.id;
        outGame.abbreviation = game.abbreviation;
        gameList.push(outGame);
      }
      console.log(gameList);
      //await AsyncStorage.multiSet("@games", gameList);
      //this._retrieveData();
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          title={"Store Data"}
          style={styles.button}
          color={colors.primary}
          onPress={() => this._storeData("76rkwed8", "na")}
        />
        <View style={styles.flatList}>
          {this.state.games.map((game) => (
            <View key={game.id} style={styles.button}>
              <GameCard
                navigation={this.props.navigation}
                id={game.id}
                abbreviation={game.abbreviation}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilecontainer: {},
  profile: {
    height: 250,
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
    margin: 20,
    justifyContent: "space-between",
  },
  notifications: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
export default MyGames;
