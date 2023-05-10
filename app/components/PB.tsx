import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { h6 } from "../themes/theme";
import { useConfig } from "../hooks";

function timeConverter(time: string) {
  const result = time.toLowerCase();
  return result.substr(2, result.length);
}

export interface PBProps {
  weblink: string;
  place: string;
  category: string;
  time: string;
}

function PB({ weblink, place, category, time }: PBProps): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink })}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.place}>
        <Text style={[h6, { color: theme.colors.primary, padding: 10 }]}>
          {place}
        </Text>
      </View>
      <View style={styles.category}>
        <Text style={[h6, { color: theme.colors.text }]}>{category}</Text>
      </View>
      <View style={styles.time}>
        <Text style={[h6, { color: theme.colors.text }]}>
          {timeConverter(time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  place: {
    flex: 3,
    alignItems: "center",
  },
  category: {
    flex: 6,
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

export default PB;
