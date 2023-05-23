import React from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useConfig } from "../hooks";

interface IScrollIndicator {
  width: number;
  slides: number; //Number of slides
  index: SharedValue<number>;
  gap?: number;
}

function ScrollIndicator({
  width,
  slides,
  index,
}: IScrollIndicator): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;
  const indicatorWidth: number = width / slides;

  if (!(slides > 1)) return <></>;

  const indicatorStyle = useAnimatedStyle(() => {
    const position = index.value * indicatorWidth;
    return {
      transform: [
        {
          translateX: withTiming(position, {
            duration: 200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  return (
    <View
      style={{
        width,
        height: 5,
        marginVertical: 5,
        flexDirection: "row",
        gap: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 2,
            height: 5,
            width: indicatorWidth,
            backgroundColor: theme.colors.primary,
          },
          indicatorStyle,
        ]}
      />
    </View>
  );
}

export default ScrollIndicator;
