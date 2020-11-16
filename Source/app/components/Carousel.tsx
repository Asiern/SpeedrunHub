import React, { ReactNode, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { colors } from "../themes/theme";

export interface CarouselProps {
  abbreviation: string;
}

export default function Carousel({ abbreviation }: CarouselProps) {
  const { width } = Dimensions.get("screen");
  const [selected, setSelected] = useState(true);
  return (
    <View>
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
                "https://www.speedrun.com/themes/" +
                abbreviation +
                "/cover-256.png",
            }}
            style={styles.Image}
          ></Image>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            width: width,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>2009</Text>
          <Text>PS3,PS4,PC</Text>
          <Text>Moderators</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        {selected == false ? (
          <View style={styles.offbtn} />
        ) : (
          <View style={styles.onbtn} />
        )}
        {selected == true ? (
          <View style={styles.offbtn} />
        ) : (
          <View style={styles.onbtn} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
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
  onbtn: {
    height: 7,
    width: 7,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
  offbtn: {
    height: 7,
    width: 7,
    borderRadius: 10,
    backgroundColor: colors.light,
    marginHorizontal: 5,
  },
});
