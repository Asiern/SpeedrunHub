import React, { memo, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getUser, useConfig } from "../hooks";
import { shadow } from "../themes/theme";
import { run } from "../hooks/types";
import { getTimeLabel } from "../utils";

export interface IRun {
  run: run;
  place: number;
}

function Run({ run, place }: IRun): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    setPlayers([]);
    run.players.map(async (player) => {
      if (player.rel === "guest" && player.name)
        setPlayers([...players, player.name]);
      else if (player.id)
        getUser(player.id).then((user) => {
          if (user.names.international || user.names.japanese)
            setPlayers([
              ...players,
              user.names.international || user.names.japanese || "",
            ]);
        });
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RunInfo", { run, place })}
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
          {players.join(", ") || run.players[0].id}
        </Text>
      </View>
      <View style={styles.time} testID="run-time">
        <Text style={[{ color: theme.colors.headerText }, styles.text]}>
          {getTimeLabel(run.times.primary_t)}
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
