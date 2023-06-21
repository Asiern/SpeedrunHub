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
        let players: user[] | undefined = undefined;
        run.players.forEach((player) => {
          const playerData = leaderboard.players?.data.find(
            (p) => p.id === player.id
          );
          if (playerData) {
            if (!players) players = [playerData];
            else players.push(playerData);
          }
        });
        leaderboard.players?.data.find((p) => p.id === run.players[0].id);
        if (!players) return null;
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
