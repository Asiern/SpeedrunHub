import * as React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export interface Slide {
  width: number;
  title: string;
  description: string;
  image: number;
}

export default function Slide({ width, image }: Slide): JSX.Element {
  return (
    <View style={[styles.container, { width }]}>
      <Image style={styles.image} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: height * 0.6,
    width: width * 0.8,
  },
});
