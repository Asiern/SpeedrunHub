import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { context } from "../../config/config";

export function About() {
  const { theme } = useContext(context);
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.info}>
        <View
          style={[
            styles.logocontainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={[styles.logo, { color: theme.colors.card }]}>
            Speedrun Hub
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          About This App
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          SpeedrunHub is an open source app for IOS/Android platforms made with
          React Native and Expo.{"\n"}
          {"\n"}
          It allows you to consult the speedrun.com page natively on your
          Android/iOS device.{"\n"}
          {"\n"}
          All the data is provided by the speedrun.com REST API.
        </Text>
        <Text
          style={[
            styles.paragraph,
            { fontWeight: "bold", color: theme.colors.text },
          ]}
        >
          Disclaimer: This is not an official app
        </Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Release Notes v1.1.1
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontWeight: "bold",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          What's New
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          - Fix: Games with no categories not loading
        </Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Send Feedback
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          Send me an email at asiern.dev@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    padding: 20,
  },
  logocontainer: {
    paddingVertical: 20,
    borderRadius: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
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
    padding: 10,
    borderRadius: 10,
  },
  legal: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  githubtext: {
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
