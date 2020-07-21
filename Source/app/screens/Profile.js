import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import Run from "../components/Run";
import user from "../config/user.json";
import { useScreens } from "react-native-screens";

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
    const runsurl =
      "https://www.speedrun.com/api/v1/users/" +
      user.id +
      "/personal-bests?embed=game,category";
    const runsresponse = await fetch(runsurl);
    const runsdata = await runsresponse.json();

    this.setState({ loading: false, runs: runsdata.data });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.profileBG}
          source={require("../assets/gr1.png")}
        >
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
                    <Text style={styles.h2}>Basque Country</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.socialbuttons}>
          <Text>Twitter</Text>
          <Text>Twitter</Text>
          <Text>Twitter</Text>
          <Text>Twitter</Text>
          <Text>Twitter</Text>
        </View>
        <Text style={styles.headertext}>Personal Bests</Text>
        <View style={styles.pbs}>
          <View style={styles.runinfo}>
            <View style={styles.game}>
              <Text>Game</Text>
            </View>
            <View style={styles.category}>
              <Text>Category</Text>
            </View>
            <View style={styles.place}>
              <Text>Place</Text>
            </View>
            <View style={styles.runner}>
              <Text>Runner</Text>
            </View>
            <View style={styles.time}>
              <Text>Time</Text>
            </View>
          </View>
          {this.state.runs.map((run) => (
            <Run
              key={run.run.id}
              category={run.category.data.name}
              place={run.place}
              runner={user.name}
              time={run.run.times.primary}
              game={run.game.data.names.international}
              abbreviation={run.game.data.abbreviation}
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
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  game: {
    flex: 3,
    //backgroundColor: "dodgerblue",
    alignItems: "center",
  },
  category: {
    flex: 5,
    //backgroundColor: "gold"
    alignItems: "center",
  },
  place: {
    flex: 3,
    //backgroundColor: "tomato",
    alignItems: "center",
  },
  runner: {
    flex: 5,
    //backgroundColor: "green",
    alignItems: "center",
  },
  time: {
    flex: 8,
    //backgroundColor: "orange",
    alignItems: "center",
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
