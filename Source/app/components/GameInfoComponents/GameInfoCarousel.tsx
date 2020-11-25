import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { colors, h4w } from "../../themes/theme";
import { useValue, onScrollEvent } from "react-native-redash/lib/module/v1";
import Dot from "../Dot";
import Animated, { divide } from "react-native-reanimated";

export interface CarouselProps {
  abbreviation: string;
  date: string;
  platformIDs: any[];
}

export default function Carousel({
  abbreviation,
  date,
  platformIDs,
}: CarouselProps) {
  const { width } = Dimensions.get("window");
  const [platforms, setPlatforms] = useState("");
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });
  useEffect(() => {
    console.log("render");
    let mounted = true;
    if (mounted) {
      (async () => {
        const url = "https://www.speedrun.com/api/v1/platforms?max=200";
        const response = await fetch(url);
        const data = await response.json();
        getPlatforms(data.data);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  function getPlatforms(data) {
    var out = "";
    for (let p of platformIDs) {
      for (let platform of data) {
        if (platform.id === p) {
          out += platform.name + " ";
          break;
        }
      }
      console.log(out);
    }
    setPlatforms(out);
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={1}
        {...{ onScroll }}
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
        <View style={[styles.info, { width }]}>
          <Text style={h4w}>Release Date: {date}</Text>
          <Text style={h4w}>{platforms}</Text>
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
        <Dot index={0} currentIndex={divide(x, width)} color={colors.primary} />
        <Dot index={1} currentIndex={divide(x, width)} color={colors.primary} />
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
