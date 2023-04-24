import { Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { getNotifications } from "../../hooks";
import { context } from "../../config/config";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
const data = ["a", "b", "c", "d"];

function Notification(): JSX.Element {
  // const style = useAnimatedStyle(() => {
  //   const scale = 1;
  //   return transform[{ scale }];
  // });
  return (
    <Animated.View
      style={{
        backgroundColor: "#738FFA",
        padding: 20,
        borderRadius: 15,
        height: 100,
        width: width - 2 * 30,
      }}
    >
      <Text>
        emileooooo got a new PB in Dark Souls III All Bosses. Their time is
        1:15:56
      </Text>
    </Animated.View>
  );
}

export default function Notifications(): JSX.Element {
  const { config } = useContext(context)!;
  useEffect(() => {
    // const notifications = getNotifications(config);
  });

  const x = useSharedValue(0);
  const offset = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={{ paddingHorizontal: 30, marginVertical: 20 }}
      horizontal
      scrollEventThrottle={16}
      decelerationRate={"fast"}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
    >
      {data.map((data, i: number) => {
        return <Notification key={i} />;
      })}
    </Animated.ScrollView>
  );
}
