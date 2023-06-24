import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useConfig } from "../hooks";
import { shadow } from "../themes/theme";

export interface IRun {
  place: number;
  players: string;
  weblink: string;
  time: string;
}

function Run({ place, players, time, weblink }: IRun): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={[
        styles.container,
        { backgroundColor: theme.colors.foreground },
        shadow,
      ]}
      testID="run-touchable"
    >
      <View style={styles.place} testID="run-place">
        <Text style={[{ color: theme.colors.primary }, styles.text]}>
          {place}
        </Text>
      </View>
      <View style={styles.runner}>
        <Text
          testID="run-players"
          style={[{ color: theme.colors.headerText }, styles.text]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {players}
        </Text>
      </View>
      <View style={styles.time} testID="run-time">
        <Text style={[{ color: theme.colors.headerText }, styles.text]}>
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(Run);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 60,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  place: {
    flex: 3,
    alignItems: "center",
  },
  runner: {
    flex: 8,
    alignItems: "center",
  },
  time: {
    flex: 8,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins",
  },
});
