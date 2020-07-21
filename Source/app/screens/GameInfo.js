import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import Run from "../components/Run";
import user from "../config/user.json";
import { useScreens } from "react-native-screens";
import GameCard from "../components/GameCard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="[A]" component={<Run></Run>}></Tab.Screen>
      <Tab.Screen name="[E]" component={<Run></Run>}></Tab.Screen>
    </Tab.Navigator>
  );
}

class GameInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      id: "",
      game: [],
    };
  }
  async componentDidMount() {
    const url =
      "https://www.speedrun.com/api/v1/games/76rkwed8?embed=categories";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ loading: false, game: data.data });
    //console.log(this.state.game.categories.data[0]);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.profileBG}
          source={{ uri: "https://www.speedrun.com/themes/na/cover-256.png" }}
        >
          <View style={styles.profile}>
            <View style={styles.imagecontainer}>
              <Image
                source={{
                  uri: "https://www.speedrun.com/themes/na/cover-256.png",
                }}
                style={styles.Image}
              ></Image>
            </View>
          </View>

          <View style={styles.userinfo}>
            <View style={styles.userinfoitem}>
              <Text style={styles.h1}>{user.name}</Text>
              <View style={styles.country}>
                <View>
                  <Text style={styles.h2}>Basque Country</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text style={styles.headertext}>Runs</Text>
        <View style={styles.pbs}>
          <View style={styles.runinfo}>
            <Text>Game</Text>
            <Text>Category</Text>
            <Text>Place</Text>
            <Text>Runner</Text>
            <Text>Time</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  profileBG: {
    flex: 1,
    resizeMode: "cover",
  },
  profile: {
    flex: 1,
  },
  country: {
    flexDirection: "row",
  },
  flag: {
    height: 18,
    width: 25,
  },
  imagecontainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    paddingTop: 30,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 80,
    width: 80,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  socialbuttons: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  h1: {
    color: colors.darkgrey,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.darkgrey,
    fontSize: 15,
    fontWeight: "normal",
    alignSelf: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 40,
  },
  pbs: {
    flex: 1,
    margin: 10,
  },
  runinfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    height: 45,
    alignSelf: "center",
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
});

export default GameInfo;
