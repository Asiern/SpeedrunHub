import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useConfig } from "../../../hooks";

interface IIntroduction {
  width: number;
}
export default function Introduction({ width }: IIntroduction): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.header, { color: theme.colors.primary }]}>
        SpeedrunHub
      </Text>
      <Text
        style={[
          styles.subHeader,
          { color: theme.colors.headerText, marginTop: 5 },
        ]}
      >
        Welcome to the SpeedrunHub!
      </Text>
      <Text
        style={[
          styles.text,
          { color: theme.colors.headerText, textAlign: "justify" },
        ]}
      >
        Explore the exciting world of speedrunning and discover the fastest
        gameplay records from speedrun.com. Stay updated with the latest
        leaderboard rankings, watch incredible speedrun videos, and follow your
        favorite games and runners. Join us on this thrilling journey through
        the world of speedrunning and witness gaming history in action. Get
        ready to experience the adrenaline of speedruns like never before. Let
        {"\u2018"}s race!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
