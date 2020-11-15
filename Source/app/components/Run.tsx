import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";

export interface RunProps {
  place: string;
  runner: string;
  time: string;
  abbreviation: string;
  categoryid: string;
  weblink: string;
}

export default function Run(props: RunProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RunInfo", {
          weblink: props.weblink,
        })
      }
      style={styles.container}
    >
      <View style={styles.place}>
        <Text style={styles.accenttext}>{props.place}</Text>
      </View>
      <View style={styles.runner}>
        <Text style={styles.text}>{props.runner}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.text}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 15,
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
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.primary,
  },
});
