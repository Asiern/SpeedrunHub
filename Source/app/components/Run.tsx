import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { colors, h6, h6p } from "../themes/theme";

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
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={styles.container}
    >
      <View style={styles.place}>
        <Text style={h6p}>{place}</Text>
      </View>
      <View style={styles.runner}>
        <Text style={h6}>{runner}</Text>
      </View>
      <View style={styles.time}>
        <Text style={h6}>{formatTime(time)}</Text>
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
    backgroundColor: colors.white,
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
