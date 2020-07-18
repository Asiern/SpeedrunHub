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
import { color } from "react-native-reanimated";
import user from "../assets/json/user.json";

const BG = {
  uri:
    "https://www.speedrun.com/themes/user/" + user.name + "/image.png",
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userpicture:
        "https://www.speedrun.com/themes/user/" + user.name + "/image.png",
      runs: [],
      user: [],
    };
  }
  async componentDidMount() {
    const runsurl =
      "https://www.speedrun.com/api/v1/users/48g3q2rx/personal-bests";
    const runsresponse = await fetch(runsurl);
    const runsdata = await runsresponse.json();

    console.log(this.state.user);

    this.setState({ loading: false, runs: runsdata.data });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.profileBG}
          source={require("../assets/gradient.jpg")}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
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

        <Text style={styles.headertext}>Personal Bests</Text>
        <View style={styles.pbs}>
          {this.state.runs.map((run) => (
            <Run
              key={run.run.id}
              category={run.run.category}
              place={run.place}
              runner={user.name}
              time={run.run.times.primary}
              gameid={run.run.game}
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
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.grey,
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
