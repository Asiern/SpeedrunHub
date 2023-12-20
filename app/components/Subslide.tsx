import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { h2, h4 } from "../themes/theme";
import Button from "./Button";
export interface SubslideProps {
  title: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}
const { width } = Dimensions.get("window");

export default function Subslide({
  title,
  description,
  last,
  onPress,
}: SubslideProps): JSX.Element {
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
        width={(width / 3) * 2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 44,
    paddingVertical: 10,
  },
  textcontainer: {
    alignItems: "center",
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
});
