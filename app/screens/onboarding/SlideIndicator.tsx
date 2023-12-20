import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useConfig } from "../../hooks";
import { shadow } from "../../themes/theme";

interface ISlideIndicator {
  index: SharedValue<number>;
  length: number;
}

const DOT_SIZE = 10;

export default function SlideIndicator({
  index,
  length,
}: ISlideIndicator): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  return (
    <View style={[styles.container]}>
      {Array.from({ length }).map((_, i) => {
        const style = useAnimatedStyle(() => {
          return {
            width: withTiming(i === index.value ? 3 * DOT_SIZE : DOT_SIZE, {
              easing: Easing.linear,
            }),
            backgroundColor: withTiming(
              i === index.value
                ? theme.colors.primary
                : theme.colors.foreground,
              {
                easing: Easing.linear,
              }
            ),
          };
        });
        return <Animated.View key={i} style={[styles.dot, style, shadow]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
