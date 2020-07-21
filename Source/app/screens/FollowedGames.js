import React, { Component } from "react";
import { StyleSheet, View, Modal, FlatList } from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user.json";

class FollowedGames extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={user.games}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <GameCard
                  navigation={this.props.navigation}
                  id={item.id}
                  abbreviation={item.abbreviation}
                />
              </View>
            )}
            numColumns={2}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  profilecontainer: {
    backgroundColor: colors.white,
  },
  profile: {
    marginTop: Constants.statusBarHeight,
    height: 100,
  },
  button: {
    paddingLeft: 20,
  },
  buttontext: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    textAlign: "center",
    color: colors.darkgrey,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 5,
  },
  modalbuttons: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: colors.light,
  },
  headertext: {
    color: colors.Crystalline1,
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  flatList: {
    flexWrap: "wrap",
    flex: 1,
    alignContent: "center",
    backgroundColor: colors.light,
  },
});

export default FollowedGames;
