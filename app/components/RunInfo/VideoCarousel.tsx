import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import WebView from "react-native-webview";
const aspectRatio = 1080 / 1920;
const { width } = Dimensions.get("window");

function getWebViewUri(url: string) {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    const start = Math.max(url.lastIndexOf("/"), url.indexOf("=")) + 1;
    const end = url.indexOf("&") > 0 ? url.indexOf("&") : url.length;
    url = url.slice(start, end);
    return "https://www.youtube.com/embed/" + url;
  } else if (url.includes("twitch")) {
    const i = url.lastIndexOf("/") + 1;
    url =
      "https://player.twitch.tv/?video=v" +
      url.slice(i, url.length) +
      "&parent=streamernews.example.com&autoplay=false";
    return url;
  } else {
    return url;
  }
}

export interface VideoCarouselProps {
  links: any[];
}

export default function VideoCarousel({
  links,
}: VideoCarouselProps): JSX.Element {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });
  const currentIndex = useDerivedValue(() => x.value / width);
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: getWebViewUri(links[0].uri) }}
        style={{ width, height: width * aspectRatio }}
      ></WebView>
    </View>
    // <Animated.View style={styles.container}>
    //   <Animated.ScrollView
    //     horizontal
    //     pagingEnabled
    //     showsHorizontalScrollIndicator={false}
    //     snapToInterval={width}
    //     decelerationRate={"fast"}
    //     bounces={false}
    //     scrollEventThrottle={1}
    //     onScroll={onScroll}
    //   >
    //     {links.map((link, index) => {
    //       return (
    //         <WebView
    //           key={index}
    //           source={{ uri: getWebViewUri(link.uri) }}
    //           style={{ width, height: width * aspectRatio }}
    //         ></WebView>
    //       );
    //     })}
    //   </Animated.ScrollView>
    //   <Animated.View
    //     style={{
    //       flex: 1,
    //       flexDirection: "row",
    //       justifyContent: "center",
    //       paddingTop: 20,
    //       backgroundColor: colors.white,
    //     }}
    //   >
    //     {links.map((_, index) => {
    //       return (
    //         <Dot
    //           key={index}
    //           index={index}
    //           currentIndex={currentIndex}
    //           color={colors.primary}
    //         />
    //       );
    //     })}
    //   </Animated.View>
    // </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
