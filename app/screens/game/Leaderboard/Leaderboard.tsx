import React from "react";
import { StyleSheet, View } from "react-native";
import { leaderboard } from "../../../hooks/types";
import { Run } from "../../../components";

interface ILeaderboard {
  leaderboard: leaderboard;
}

function Leaderboard({ leaderboard }: ILeaderboard): JSX.Element {
  const { runs } = leaderboard;
  return (
    <View style={styles.container}>
      {runs.map(({ run, place }) => {
        return <Run key={run.id} {...{ run, place }} />;
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
