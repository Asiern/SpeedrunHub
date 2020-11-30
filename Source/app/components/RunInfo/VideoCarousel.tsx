import React from "react";
import { ScrollView, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import WebView from "react-native-webview";
import { colors } from "../../themes/theme";
import Dot from "../Dot";
const aspectRatio = 1080 / 1920;
const { width } = Dimensions.get("window");

function getWebViewUri(url: string) {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const i = url.lastIndexOf("/") + 1;
    url = url.slice(i, url.length);
    return "https://www.youtube.com/embed/" + url;
  } else if (url.includes("twitch")) {
    return "twitch";
  }
}

export interface VideoCarouselProps {
  links: any[];
}

export default function VideoCarousel({ links }: VideoCarouselProps) {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });
  const currentIndex = useDerivedValue(() => x.value / width);
  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={1}
        onScroll={onScroll}
      >
        <WebView
          source={{ uri: "https://www.youtube.com/embed/hOqBkH69ZHE" }}
          style={{ width, height: width * aspectRatio }}
        ></WebView>
        <WebView
          source={{ uri: "https://www.youtube.com/embed/hOqBkH69ZHE" }}
          style={{ width, height: width * aspectRatio }}
        ></WebView>
      </Animated.ScrollView>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 20,
          backgroundColor: colors.white,
        }}
      >
        <Dot index={0} currentIndex={currentIndex} color={colors.primary} />
        <Dot index={1} currentIndex={currentIndex} color={colors.primary} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
