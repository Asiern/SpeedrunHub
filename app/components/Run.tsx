import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { h6, colors } from "../themes/theme";
import { run } from "../hooks/types";
import { getUser, useConfig } from "../hooks";

export interface IRun {
  run: run;
  place: number;
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

export default function Run({ run, place }: IRun): JSX.Element {
  const navigation = useNavigation();
  const { config } = useConfig();
  const { theme } = config;
  const { weblink, times } = run;
  const [playerList, setPlayersList] = useState<string[]>([]);

  const getPlayers = useCallback(async () => {
    const _players: string[] = [];
    for (const player of run.players) {
      if (player.rel === "user") {
        if (player.id === undefined) continue;
        const user = await getUser(player.id);
        _players.push(user.names.international ?? user.names.japanese ?? "");
      } else {
        //Player is guest
        if (player.name === undefined) continue;
        _players.push(player.name);
      }
    }

    setPlayersList(_players);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [run]);
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
          {playerList.join(", ")}
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
