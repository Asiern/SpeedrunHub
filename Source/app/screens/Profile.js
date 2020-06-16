import React, { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
} from "react-native";
import GameCard from "../components/GameCard";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import user from "../config/user";
import User from "../components/User";
import Constants from "expo-constants";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      userpicture:
        "https://www.speedrun.com/themes/user/" + user.name + "/image.png",
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
              <Text style={styles.h2}>{user.country}</Text>
            </View>
            <View style={styles.socialbuttons}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.button}>
                  <Text style={styles.buttontext}>Twitch</Text>
                </View>
                <View style={styles.button}>
                  <Text style={styles.buttontext}>YouTube</Text>
                </View>
                <View style={styles.button}>
                  <Text style={styles.buttontext}>Discord</Text>
                </View>
                <View style={styles.button}>
                  <Text style={styles.buttontext}>Settings</Text>
                </View>
                <View style={styles.button}>
                  <Text style={styles.buttontext}>Settings</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.preferences}>
          <Text style={styles.headertext}>Runs</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: colors.light,
  },
  profile: {
    backgroundColor: colors.light,
    marginTop: Constants.statusBarHeight,
    flex: 2,
  },
  imagecontainer: {
    flex: 2,
    backgroundColor: colors.light,
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
    flex: 3,
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
    paddingTop: 20,
    color: colors.darkgrey,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  h2: {
    color: colors.darkgrey,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  preferences: {
    flex: 3,
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
