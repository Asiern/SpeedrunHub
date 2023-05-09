import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

interface SplitProps {
  name: string;
  duration: string;
  finished: string;
}

export default function Split({ name, duration, finished }: SplitProps) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text>{name}</Text>
      </View>
      <View style={styles.durationContainer}>
        <Text>{duration}</Text>
      </View>
      <View style={styles.finishedContainer}>
        <Text>{finished}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  nameContainer: {
    flex: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  durationContainer: {
    flex: 3,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  finishedContainer: {
    flex: 3,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: "center",
  },
});
