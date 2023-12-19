import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { leaderboard } from "../../../hooks/types";
import { ActivityIndicator, Run } from "../../../components";
import { FlashList } from "@shopify/flash-list";

interface ILeaderboard {
  leaderboard: leaderboard;
}

function Leaderboard({ leaderboard }: ILeaderboard): JSX.Element {
  const renderItem = useCallback(({ item }) => {
    return <Run run={item.run} place={item.place} />;
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
