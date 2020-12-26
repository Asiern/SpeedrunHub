import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors, shadow } from "../../themes/theme";

export interface ModalProps {
  visible: boolean;
  offset: number;
  children: React.ReactNode;
}

const { width, height } = Dimensions.get("screen");
const modalWidth = width * 0.9;
const modalHeight = modalWidth * 1.5;
const topPosition = height / 2 - modalHeight / 2;

export default function Modal({ visible, offset, children }: ModalProps) {
  const isVisible = useSharedValue(visible ? 1 : 0);
  const transition = useDerivedValue(() => {
    return withTiming(isVisible.value);
  });
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: transition.value,
      top: topPosition + offset,
    };
  });
  return (
    <Animated.View style={[styles.container, shadow, opacity]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: modalWidth,
    height: modalHeight,
    alignSelf: "center",
    borderRadius: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
