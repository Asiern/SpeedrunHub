import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import GameCard from "../components/GameCard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user";
import User from "../components/User";
import Constants from "expo-constants";
import Run from "../components/Run";
import Leaderboard from "../components/Leaderboard";

const BG = {
  uri:
    "https://www.speedrun.com/themes/user/Asiern/background.png?version=46d4f3ee",
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userpicture:
        "https://www.speedrun.com/themes/user/" + user.name + "/image.png",
      runs: [],
    };
  }
  async componentDidMount() {
    const url = "https://www.speedrun.com/api/v1/users/48g3q2rx/personal-bests";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, runs: data.data });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground style={styles.profileBG} source={BG}>
          <View style={styles.profile}>
            <View style={styles.imagecontainer}>
              <Image
                source={{
                  uri: this.state.userpicture,
                }}
                style={styles.Image}
              ></Image>
            </View>

            <View style={styles.userinfo}>
              <View style={styles.userinfoitem}>
                <Text style={styles.h1}>{user.name}</Text>
                <View style={styles.country}>
                  <View>
                    <Image
                      source={{
                        uri: "https://www.speedrun.com/images/flags/es/pv.png",
                      }}
                      style={styles.flag}
                    ></Image>
                  </View>
                  <View>
                    <Text style={styles.h2}>{user.country}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.preferences}>
          <Text style={styles.headertext}>Runs</Text>
          {this.state.runs.map((run) => (
            <Run
              category={run.run.category}
              place={run.place}
              runner={run.run.players[0].id}
              time={"39m 07s"}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
  },
  profileBG: {
    flex: 1,
    resizeMode: "cover",
    paddingVertical: 20,
  },
  profile: {
    marginTop: Constants.statusBarHeight,
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
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  socialbuttons: {
    flex: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.light,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  preferences: {
    flex: 2,
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

export default Profile;
