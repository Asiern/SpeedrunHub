import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { h6, colors } from "../themes/theme";
import { run, user } from "../hooks/types";
import { useConfig } from "../hooks";

export interface IRun {
  run: run;
  place: number;
  players: (user | string)[];
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

function Run({ run, place, players }: IRun): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  const { weblink, times } = run;
  const playersLabel = players.map((p) => {
    if (typeof p === "string") {
      return p;
    } else {
      return p.names.international ?? p.names.japanese ?? "";
    }
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={[styles.container, { backgroundColor: theme.colors.foreground }]}
      testID="run-touchable"
    >
      <View style={styles.place} testID="run-place">
        <Text style={[h6, { color: theme.colors.primary }]}>{place}</Text>
      </View>
      <View style={styles.runner}>
        <Text
          testID="run-players"
          style={[h6, { color: theme.colors.text }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {playersLabel.join(", ")}
        </Text>
      </View>
      <View style={styles.time} testID="run-time">
        <Text style={[h6, { color: theme.colors.text }]}>
          {formatTime(times.primary)}
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
