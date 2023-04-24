import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { h6, colors } from "../themes/theme";
import { context } from "../config/config";

export interface RunProps {
  place: string;
  runner: string;
  time: string;
  categoryid: string;
  weblink: string;
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

export default function Run({ place, runner, time, weblink }: RunProps) {
  const navigation = useNavigation();
  const { config } = useContext(context)!;
  const { theme } = config;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.place}>
        <Text style={[h6, { color: theme.colors.primary }]}>{place}</Text>
      </View>
      <View style={styles.runner}>
        <Text style={[h6, { color: theme.colors.text }]}>{runner}</Text>
      </View>
      <View style={styles.time}>
        <Text style={[h6, { color: theme.colors.text }]}>
          {formatTime(time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 25,
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
