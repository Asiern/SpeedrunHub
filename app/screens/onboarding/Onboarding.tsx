import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useConfig } from "../../hooks";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

export default function Onboarding(): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  // Number of slides in the onboarding screen
  const length = 3;

  // Value used to determine the current slide index
  const currentIndex = useSharedValue<number>(0);

  // Reference to the scroll view
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Slide index={currentIndex} scrollRef={scrollRef} />
      <SlideIndicator index={currentIndex} length={length} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
