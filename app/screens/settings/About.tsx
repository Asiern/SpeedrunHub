import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { SquareButton } from "../../components/SquareButton";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../../hooks";

export function About(): JSX.Element {
  // Retrieve the theme from the app context
  const { config } = useConfig();
  const { theme } = config;
  const navigation = useNavigation();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.foreground }]}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.info}>
        <SquareButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <View
          style={[
            styles.logocontainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={[styles.logo, { color: theme.colors.foreground }]}>
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
            { fontFamily: "Poppins-Medium", color: theme.colors.text },
          ]}
        >
          Disclaimer: This is not an official app
        </Text>
        {/* TODO add release notes for v2.0.0 */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Release Notes v2.0.0
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontFamily: "Poppins-Medium",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          What&apos;s New
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
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logocontainer: {
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  logo: {
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 25,
    paddingTop: 20,
  },
  paragraph: {
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
