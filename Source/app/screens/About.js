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
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";

export default function About() {
  function loadInBrowser(link) {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  }
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
        <Text style={styles.title}>Contribute</Text>
        <Text style={styles.paragraph}>
          If you have any problems or find any improvements to be made, you are
          welcome to open an issue on the GitHub page for it to be fixed.
          {"\n"}
          {"\n"}
          As this project is completely open source, if you want to contribute,
          you can find the GitHub page at the link below.
        </Text>
        <TouchableOpacity
          onPress={() =>
            loadInBrowser("https://github.com/Asiern/Speerun.comApp")
          }
        >
          <View style={styles.github}>
            <Icon name="logo-github" color={colors.white} size={35} />
            <Text style={styles.githubtext}>GitHub</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>WIP</Text>
        <Text style={styles.paragraph}>
          App Refresh{"\n"}
          Themes{"\n"}Animations{"\n"}UI Design{"\n"}Run Info{"\n"}Push
          Notifications{"\n"}My Games{"\n"}Japanese text support
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
  githubtext: {
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 20,
    color: colors.white,
  },
});
