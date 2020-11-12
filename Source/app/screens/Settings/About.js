import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import colors from "../../config/colors";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
        <View style={styles.logocontainer}>
          <Text style={styles.logo}>Speedrun Hub</Text>
        </View>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.paragraph}>
          SpeedrunHub is an open source app for IOS/Android platforms made with
          React Native and Expo.{"\n"}
          {"\n"}
          It allows you to consult the speedrun.com page natively on your
          Android/iOS device.{"\n"}
          {"\n"}
          All the data is provided by the speedrun.com REST API.
        </Text>
        <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
          Disclaimer: This is not an official app
        </Text>

        <Text style={styles.title}>WIP</Text>
        <Text style={styles.paragraph}>
          App Refresh{"\n"}
          Themes{"\n"}Animations{"\n"}UI Design{"\n"}Run Info{"\n"}Push
          Notifications{"\n"}Japanese text support
        </Text>
        <Text style={styles.title}>Release Notes</Text>
        <Text
          style={[
            styles.paragraph,
            { fontWeight: "bold", paddingBottom: -5, fontSize: 18 },
          ]}
        >
          What's New
        </Text>
        <Text style={styles.paragraph}>
          Personal Bests are now sorted by games.
        </Text>
        <Text
          style={[
            styles.paragraph,
            { fontWeight: "bold", paddingBottom: -5, fontSize: 18 },
          ]}
        >
          Fixes
        </Text>
        <Text style={styles.paragraph}>
          Fixed: Cannot remove games from `MyGames`.
          {"\n"}
          {"\n"}
          Fixed: MyGames not reloading when adding/removing games.
          {"\n"}
          {"\n"}
          Fixed: Back button not working properly.
        </Text>
        <Text style={styles.title}>Send Feedback</Text>
        <Text style={styles.paragraph}>
          Send me an email at asiern.dev@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },

  info: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    padding: 20,
  },
  logocontainer: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderRadius: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 25,
    paddingTop: 20,
  },
  paragraph: {
    paddingVertical: 10,
    fontSize: 15,
  },
  github: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.darkgrey,
    padding: 10,
    borderRadius: 10,
  },
  legal: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  githubtext: {
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 20,
    color: colors.white,
  },
});
