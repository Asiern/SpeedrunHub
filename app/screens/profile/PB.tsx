import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { personalBest } from "../../hooks/types";
import { useConfig } from "../../hooks";
import { shadow } from "../../themes/theme";

export interface IPB {
  pb: personalBest;
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

function PB({ pb }: IPB): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  const { place, run, category } = pb;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { weblink: run.weblink })}
      style={[
        styles.container,
        { backgroundColor: theme.colors.foreground },
        shadow,
      ]}
    >
      <View style={styles.place}>
        <Text style={[{ color: theme.colors.primary, fontFamily: "Poppins" }]}>
          {place}
        </Text>
      </View>
      <View style={styles.category}>
        <Text
          style={[{ color: theme.colors.headerText }, styles.text]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {category.data.name}
        </Text>
      </View>
      <View style={styles.time}>
        <Text style={[{ color: theme.colors.headerText }, styles.text]}>
          {formatTime(run.times.primary)}
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
  },
  place: {
    flex: 3,
    alignItems: "center",
  },
  category: {
    flex: 8,
    alignItems: "center",
  },
  text: { fontFamily: "Poppins" },
  time: {
    flex: 8,
    alignItems: "center",
  },
});

export default memo(PB);
