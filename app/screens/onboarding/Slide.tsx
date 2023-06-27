import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useConfig } from "../../hooks";
import { shadow } from "../../themes/theme";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { CrashData, Introduction, TermsConditions } from "./slides";
import crashlytics from "@react-native-firebase/crashlytics";

interface ISlide {
  index: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
}

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - 2 * 30;

export default function Slide({ index, scrollRef }: ISlide): JSX.Element {
  const { config } = useConfig();
  const { theme } = config;

  const onScroll = useAnimatedScrollHandler((event) => {
    try {
      crashlytics().log("User is scrolling through onboarding slides");
      // Update the current index value based on the scroll position
      index.value = Math.round(event.contentOffset.x / SLIDE_WIDTH);
    } catch (e) {
      crashlytics().recordError(e);
      console.log(e);
    }
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.foreground },
        shadow,
      ]}
    >
      <Animated.ScrollView
        style={styles.scrollView}
        horizontal
        snapToInterval={SLIDE_WIDTH}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        scrollEventThrottle={16}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Introduction width={SLIDE_WIDTH} />
        <CrashData width={SLIDE_WIDTH} />
        <TermsConditions width={SLIDE_WIDTH} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});
