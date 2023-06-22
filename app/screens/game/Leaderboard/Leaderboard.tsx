import React from "react";
import { StyleSheet, View } from "react-native";
import { leaderboard, user } from "../../../hooks/types";
import { Run } from "../../../components";

interface ILeaderboard {
  leaderboard: leaderboard;
}

function Leaderboard({ leaderboard }: ILeaderboard): JSX.Element {
  const { runs } = leaderboard;
  return (
    <View style={styles.container}>
      {runs.map(({ run, place }) => {
        const players: (user | string)[] = [];
        run.players.forEach((player) => {
          if (player.rel === "guest" && player.name) {
            players?.push(player.name);
          } else if (player.rel === "user") {
            const playerData = leaderboard.players?.data.find(
              (p) => p.id === player.id
            );
            if (playerData) players.push(playerData);
          }
        });

        if (players.length === 0) return null;

        return (
          <Run
            key={run.id}
            {...{
              run,
              place,
              players,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
});

export default Leaderboard;
