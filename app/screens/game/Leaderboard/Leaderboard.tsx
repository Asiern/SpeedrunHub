import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { leaderboard, player } from "../../../hooks/types";
import { ActivityIndicator, Run } from "../../../components";
import { FlashList } from "@shopify/flash-list";

interface ILeaderboard {
  leaderboard: leaderboard;
}

function formatTime(time: string) {
  return time.slice(2, time.length).toLowerCase();
}

function Leaderboard({ leaderboard }: ILeaderboard): JSX.Element {
  const renderItem = useCallback(({ item }) => {
    let players = "";

    // Find player data inside embeded players
    item.run.players.forEach((player: player) => {
      // If player is guest, use name
      if (player.rel === "guest" && player.name) {
        players += player.name + ", ";
      }
      // If player is user, use name
      else if (player.rel === "user") {
        // Find user data inside embeded users
        const playerData = leaderboard.players?.data.find(
          (p) => p.id === player.id
        );
        //  If user has data, use name
        if (playerData) {
          //  If user has international name, use it
          if (playerData.names.international)
            players += playerData.names.international + ", ";
          //  If user has japanese name, use it
          else if (playerData.names.japanese)
            players += playerData.names.japanese + ", ";
        }
      }

      // Remove last comma
      players = players.trimEnd().slice(0, -1);
    });
    return (
      <Run
        place={item.place}
        players={players}
        time={formatTime(item.run.times.primary)}
        weblink={item.run.weblink}
      />
    );
  }, []);

  return (
    <FlashList
      keyExtractor={(item) => item.run.id}
      data={leaderboard.runs}
      renderItem={renderItem}
      estimatedItemSize={100}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ListEmptyComponent={<ActivityIndicator />}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  footer: {
    height: 30,
  },
});

export default Leaderboard;
