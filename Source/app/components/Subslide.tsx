import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { h2, h4 } from "../themes/theme";
import Button from "./Buttons/Button";
export interface SubslideProps {
  title: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

export default function Subslide({
  title,
  description,
  last,
  onPress,
}: SubslideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={h2}>{title}</Text>
        <Text style={h4}>{description}</Text>
      </View>
      <Button
        label={last ? "Let's get Started" : "Next"}
        variant={last ? "primary" : "default"}
        {...{ onPress }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
  textcontainer: {
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
