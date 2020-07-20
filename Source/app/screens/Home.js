import React, { Component } from "react";
import { StyleSheet, View, Modal, FlatList } from "react-native";
import Constants from "expo-constants";
import GameCard from "../components/GameCard";
import Test from "./test";
import User from "../components/User";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user.json";

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.profilecontainer}>
          <View style={styles.profile}>
            <User username={user.name} />
          </View>
        </View>
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
  },
});

export default Home;
