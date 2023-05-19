import React, { memo } from "react";
import { View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
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
  gap = 1,
}: IScrollIndicator): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  if (!(slides > 1)) return <></>;
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
      {Array.from({ length: slides }).map((_, i: number) => {
        const style = useAnimatedStyle(() => ({
          backgroundColor:
            index.value === i ? theme.colors.primary : theme.colors.foreground,
        }));
        return (
          <Animated.View
            key={i}
            style={[
              {
                borderRadius: 2,
                height: 5,
                width: width / slides - gap * (slides - 1),
              },
              style,
            ]}
          />
        );
      })}
    </View>
  );
}

export default memo(ScrollIndicator);
