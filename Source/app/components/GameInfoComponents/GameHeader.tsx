import { useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { Text, View, ImageBackground, StyleSheet, Image } from "react-native";
import { StackActions } from "@react-navigation/native";

import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";
import colors from "../../config/colors";
import { h2w } from "../../themes/Styles";
import { StatusBar } from "expo-status-bar";

export interface GameHeaderProps {
  abbreviation: string;
  name?: string;
  children: ReactNode;
}

const GameHeader = ({ abbreviation, name, children }: GameHeaderProps) => {
  const navigation = useNavigation();
  const goBack = StackActions.pop();
  return (
    <ImageBackground
      imageStyle={{ opacity: 0.3 }}
      style={styles.profileBG}
      source={{
        uri:
          "https://www.speedrun.com/themes/" + abbreviation + "/cover-256.png",
      }}
    >
      <StatusBar style={"light"}></StatusBar>
      <View style={styles.topbar}>
        <View style={styles.topbarleft}>
          <Feather
            onPress={() => navigation.dispatch(goBack)}
            name="arrow-left"
            color={colors.white}
            size={35}
            style={{ paddingLeft: 20 }}
          />
        </View>
        <View style={styles.topbarcenter}></View>
        <View style={styles.topbarright}>{children}</View>
      </View>
      <View style={styles.profile}>
        <View style={styles.imagecontainer}>
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
      </View>
      <View style={styles.userinfo}>
        <Text style={h2w}>{name}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileBG: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: colors.black,
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
    alignItems: "flex-end",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    width: 110,
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
export default GameHeader;
