import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { h6, colors } from "../themes/theme";
import { run } from "../hooks/types";
import { useConfig } from "../hooks";

export interface IRun {
  run: run;
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

export default function Run({ run }: IRun): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  const { weblink, players, times, values } = run;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={[styles.container, { backgroundColor: theme.colors.foreground }]}
    >
      <View style={styles.place}>
        <Text style={[h6, { color: theme.colors.primary }]}>{0}</Text>
      </View>
      <View style={styles.runner}>
        <Text style={[h6, { color: theme.colors.text }]}>
          {players[0].name}
        </Text>
      </View>
      <View style={styles.time}>
        <Text style={[h6, { color: theme.colors.text }]}>
          {formatTime(times.primary)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 60,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
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
});
