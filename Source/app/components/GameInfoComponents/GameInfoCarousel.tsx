import React, { useContext } from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { colors, h4w } from "../../themes/theme";
import Dot from "../Dot";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
} from "react-native-reanimated";
import { context } from "../../config/config";

export interface CarouselProps {
  abbreviation: string;
  date: string;
  platformIDs: any[];
}

export default function Carousel({ abbreviation, date }: CarouselProps) {
  const { width } = Dimensions.get("window");
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const currentIndex = useDerivedValue(() => x.value / width);
  const { theme } = useContext(context);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <View style={[styles.imagecontainer, { width }]}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/" +
                abbreviation +
                "/cover-256.png",
            }}
            style={styles.Image}
          ></Image>
        </View>
        <View style={[styles.info, { width, padding: 20 }]}>
          <Text style={h4w}>Release Date: {date}</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Dot
          index={0}
          currentIndex={currentIndex}
          color={theme.colors.primary}
        />
        <Dot
          index={1}
          currentIndex={currentIndex}
          color={theme.colors.primary}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Image: {
    width: 110,
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  circunference: {
    height: 8,
    width: 8,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 5,
  },
});
