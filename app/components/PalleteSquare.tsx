import * as React from "react";
import { View, StyleSheet, ColorValue } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { shadow } from "../themes/theme";

export interface PalleteSquareProps {
  color: ColorValue;
  onPress: () => void;
  selected: boolean;
}

export function PalleteSquare({
  color,
  selected,
  onPress,
}: PalleteSquareProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          shadow,
          { backgroundColor: color },
          selected ? styles.border : null,
        ]}
      />
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "green",
  },
  border: {
    borderWidth: 10,
    borderColor: "white",
  },
});
