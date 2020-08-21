import React, { Component, useState } from "react";
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

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  loadInBrowser = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.info}>
          <View style={styles.logocontainer}>
            <Text style={styles.logo}>Speedrun.com App</Text>
          </View>
          <Text style={styles.title}>About This App</Text>
          <Text style={styles.paragraph}>
            This app for IOS/Android platforms was made using React Native and
            it is not an official app.
          </Text>
          <Text style={styles.paragraph}>
            It allows you to consult the speedrun.com page. All the request are
            directed to the speedrun.com REST API.
          </Text>
          <Text style={styles.title}>How Can I Help?</Text>
          <Text style={styles.paragraph}>
            If you have any problems or find any improvements to be made, you
            are welcome to open an issue on the GitHub page for it to be fixed.
          </Text>
          <Text style={styles.paragraph}>
            As this project is completely open source, if you want to
            contribute, you can find the GitHub page at the link below.
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.loadInBrowser("https://github.com/Asiern/Speerun.comApp")
            }
          >
            <View style={styles.github}>
              <Icon name="logo-github" color={colors.white} size={35} />
              <Text style={styles.githubtext}>GitHub</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.paragraph}>
            Donations are not necessary, but if you like the app and are willing
            to donate, you are welcome.
          </Text>
          <Text style={styles.paragraph}>
            All donations will be used to improve / maintain the app.
          </Text>

          <TouchableOpacity
            onPress={() =>
              this.loadInBrowser("https://paypal.me/asiernl?locale.x=es_ES")
            }
          >
            <View style={styles.donations}>
              <Icon name="logo-usd" color={colors.white} size={35} />
              <Text style={styles.githubtext}>Donations</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Contact Me</Text>
          <Text style={styles.paragraph}>
            asiern.dev@gmail.com // Discord: Asiern#5149
          </Text>
        </View>
      </ScrollView>
    );
  }
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
  donations: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.Crystalline1,
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

export default About;
