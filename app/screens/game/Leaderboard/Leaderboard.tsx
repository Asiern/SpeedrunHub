import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { leaderboard, user } from "../../../hooks/types";
import { ActivityIndicator, Run } from "../../../components";
import { FlashList } from "@shopify/flash-list";

interface ILeaderboard {
  leaderboard: leaderboard;
}

function Leaderboard({ leaderboard }: ILeaderboard): JSX.Element {
  const renderItem = useCallback(({ item, index }) => {
    const players: (user | string)[] = [];
    item.run.players.forEach((player) => {
      if (index === 9) console.log(item.run.players);
      if (player.rel === "guest" && player.name) {
        players?.push(player.name);
      } else if (player.rel === "user") {
        const playerData = leaderboard.players?.data.find(
          (p) => p.id === player.id
        );
        if (playerData) players.push(playerData);
      }
    });
    return <Run place={item.place} run={item.run} players={players} />;
  }, []);

  return (
    <FlashList
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
