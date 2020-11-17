import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { colors, h4w } from "../../themes/theme";

export interface CarouselProps {
  username: string;
  signup: string;
}

export default function Carousel({ username, signup }: CarouselProps) {
  const { width } = Dimensions.get("screen");
  const [selected, setSelected] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={() => setSelected(!selected)}
      >
        <View style={[styles.imagecontainer, { width }]}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" +
                username +
                "/image.png",
            }}
            style={styles.Image}
          ></Image>
        </View>
        <View style={[styles.info, { width }]}>
          <Text style={h4w}>Signup: {signup}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        {selected == true ? (
          <View style={[styles.circle, { backgroundColor: colors.white }]} />
        ) : (
          <View style={[styles.circunference, { borderColor: colors.white }]} />
        )}
        {selected == false ? (
          <View style={[styles.circle, { backgroundColor: colors.white }]} />
        ) : (
          <View style={[styles.circunference, { borderColor: colors.white }]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
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
