import * as React from "react";
import { View, Text } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { colors } from "../themes/theme";

export interface DotProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

export default function Dot({ index, currentIndex }: DotProps) {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: colors.primary,
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
        transform: [{ scale }],
      }}
    />
  );
}
